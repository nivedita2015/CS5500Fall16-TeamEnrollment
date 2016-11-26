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



mongoose.connect('mongodb://ec2-52-207-253-108.compute-1.amazonaws.com:27017/Enrollment')
var db = mongoose.connection;
db.on('error', console.error.bind(console, 'connection error:'));
db.once('open', function() {
  // we're connected!
});

var userSchema = mongoose.Schema({
    username : String,
    password: String
});



var Users = module.exports = mongoose.model('Users', userSchema);


app.get('/',function(req,res){
    res.send('Welcome to the Enrollment project!');
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

// This API is not being used currently. Hence, there are no test cases for this.

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

// listen (start app with node server.js) ======================================
app.listen(8080);
console.log('App listening on port 8080');

