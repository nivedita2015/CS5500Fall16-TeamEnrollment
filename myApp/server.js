// server.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
app.use(bodyParser.urlencoded({
    extended: true
}));
app.use(require('body-parser').json());

app.all("/*", function (req, res, next) {
    res.header("Access-Control-Allow-Origin", "*");
    res.header("Access-Control-Allow-Headers", "Cache-Control, Pragma, Origin, Authorization, Content-Type, X-Requested-With");
    res.header("Access-Control-Allow-Methods", "GET, PUT, POST, DELETE");
    return next();
});

mongoose.connect('mongodb://ec2-52-207-253-108.compute-1.amazonaws.com:27017/Enrollment')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
   console.log('connected')
});

var userSchema = mongoose.Schema({
    username : String,
    password: String
});

var eventSchema = mongoose.Schema({
    Name : String,
    Group : String,
    Dte : Date,
    Time : String,
    Campus : String
});

var subscribedEventSchema = mongoose.Schema({
    Events : [String]
});

var Users = module.exports = mongoose.model('Users', userSchema);
var Events = module.exports = mongoose.model('Events', eventSchema);
var Subscribed = module.exports = mongoose.model('SubscribedEvents', subscribedEventSchema);

app.get('/',function(req,res){
    res.send('Hello World!');
})

// APIs for user login ----------------------------------------------
app.get('/users', function(req,res){
     var uname = req.query.username;
     var pwd = req.query.password;
     Users.findOne({'username': uname},function(err,usrs){
         if (usrs==null) {
             res.json('False')
             return;
         };

         if(err){
             res.json('False');
             return;
         }
         if(usrs.password == pwd){
             res.json(usrs.id);
             return;
         }
         res.json('False');

     });
 });

app.post('/users', function(req,res){
    var user = new Users();
    user.username = req.body.username;
    user.password = req.body.password;
    console.log(user.username);
    user.save(function(err,user){
        if(err){
            throw err;
        }
        res.send('User added!')
    });
});

// End of APIs for user login ----------------------------------------------

// APIs for Events ---------------------------------------------------------



app.get('/allEvents', function(req,res){
    Events.find(function(err,usrs){
        if(err){
            throw err;
        }
        res.json(usrs)
    });
});


app.get('/users/events', function(req,res){
    var id = mongoose.Types.ObjectId(req.query.id);
    var array =  [];
    Subscribed.findOne({'_id':id},function(err,userEvents){
        if(err){
            throw err;
        }
        if(userEvents == null){
          res.send(array);
          return;
        }
    array = userEvents.Events;
    for (var i = 0; i < array.length; i++) {
        array[i] = mongoose.Types.ObjectId(array[i]);
    };
    Events.find({'_id' : { $in : array}}, function(err, events){
        res.send(events);
    });

    });
});


// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');
