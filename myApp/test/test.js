var chai = require('chai');
var chaiHttp = require('chai-http');
var should = chai.should();
var assert = chai.assert;
var mongoose = require("mongoose");
var server =  require('../server');
chai.use(chaiHttp);



describe('Server Tests', function() {
  it('Server should be running / GET', function(done) {
    chai.request(server)
      .get('/')
      .end(function(err, res){
        res.should.have.status(200);
        res.should.be.string;
        done();
      });
  });
});


describe('Login Tests', function() {
  it('Correct combination should return the userID /users GET', function(done) {
    chai.request(server)
      .get('/users?username=alice@husky.neu.edu&password=alice')
      .end(function(err, res){
	console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.equal('5835e41872302c8dd48ba5f0');
        done();
      });
  });

  it('Incorrect combination should return False /users GET', function(done) {
    chai.request(server)
      .get('/users?username=alice@husky.neu.edu&password=test')
      .end(function(err, res){
	console.log(res.body);
        res.should.have.status(200);
        res.should.be.json;
        res.body.should.have.equal('False');
        done();
      });
  });

  it('A non-existent username should return False /users GET', function(done) {
    chai.request(server)
      .get('/users?username=mimani.s@husky.neu.edu&password=test')
      .end(function(err, res){
	console.log(res.body);
        res.should.have.status(200);
        res.should.be.string;
        res.body.should.have.equal('False');
        done();
      });
  });
});


 describe('Events Tests', function() {
   it('Should return list of events subscribed by a user /users/events GET', function(done) {
     chai.request(server)
       .get('/users/events?id=5835e41872302c8dd48ba5f0')
       .end(function(err, res){
	       console.log(res.body);
         res.should.be.array;
         res.should.have.status(200);
         assert.lengthOf(res.body,2,'result should have length 2');
         done();
       });
   });

   it('Should return [] is user has not subscribed to any event /users/events GET', function(done) {
     chai.request(server)
       .get('/users/events?id=5835e41872302c8dd48ba5f1')
       .end(function(err, res){
        console.log(res.body);
         res.should.be.array;
         assert.lengthOf(res.body,0,'result should have length 0');
         res.should.have.status(200);
         done();
       });
   });


   it('Should return array of events in the database /allEvents GET', function(done) {
     chai.request(server)
       .get('/allEvents')
       .end(function(err, res){
        console.log(res.body);
         res.should.be.array;
         assert.lengthOf(res.body,3,'result should have length 0');
         res.should.have.status(200);
         res.body[0].should.have.property("_id");
         done();
       });
   });

  // it('Should return the event details for a given event /events/id GET', function(done) {
  //    chai.request(server)
  //      .get('/events/id?id=5835e33a72302c8dd48ba5ee')
  //      .end(function(err, res){
  //       console.log(res.body);
  //        res.should.be.json;
  //        res.body.should.have.property("Name");
  //        res.body.should.have.property("Group");
  //        res.body.should.have.property("Date");
  //        res.body.should.have.property("Time");
  //        res.body.should.have.property("Campus");
  //        res.should.have.status(200);
  //        done();
  //      });
  //  });
 });

