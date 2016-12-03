// server.js

// call the packages we need
var express    = require('express');        // call express
var app        = express();                 // define our app using express
var mongoose   = require('mongoose');
var bodyParser = require('body-parser');
var path = require('path');
var http = require('http');
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

app.use(express.static(path.join(__dirname, '../client/public')));

mongoose.connect('mongodb://ec2-35-164-23-154.us-west-2.compute.amazonaws.com:27017/Enrollment')
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

         if(usrs.password == pwd){
             res.json(usrs.id);
             return;
         }
         res.json('False');

     });
 });

// End of APIs for user login ----------------------------------------------

// APIs for Events ---------------------------------------------------------

// return all events
app.get('/allEvents', function(req,res){
    Events.find(function(err,usrs){
        res.json(usrs)
    });
});

// return specific details of user subscribed events
app.get('/users/events', function(req,res){
    var id = mongoose.Types.ObjectId(req.query.id);
    var array =  [];
    Subscribed.findOne({'_id':id},function(err,userEvents){
        console.log(userEvents);
        if(userEvents == null){
          console.log("got nothing");
          res.send(array);
          return;
        }
    array = userEvents.Events;
    console.log("got events");
    console.log(array);
    for (var i = 0; i < array.length; i++) {
        array[i] = mongoose.Types.ObjectId(array[i]);
    };
    Events.find({'_id' : { $in : array}},{"Name": 1,"Date":1,"Time":1,"Location":1, "Campus":1}, function(err, events){
        res.send(events);
    });

    });
});

// return all details of a given event
app.get('/events', function(req,res){
    var id = mongoose.Types.ObjectId(req.query.id);
    Events.findOne({'_id' : id}, function(err, events){
          res.json(events);
          return;
    });
});


// listen (start app with node server.js) ======================================
var server   = http.createServer(app);
server.listen(8080, function() {
  console.log("Node server running on port 8080");
});

module.exports = app;
