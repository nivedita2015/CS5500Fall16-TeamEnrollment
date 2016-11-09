angular.module('starter.controllers', ['ui.router'])

  .controller('LoginCtrl', function($state,$rootScope,$scope) {

    //adding $scope.title for Jasmine testing purposes//
    $scope.title = 'testing';

    var users=[
      {username: "alice@husky.neu.edu",    password: "alice",    },
      {username: "bob@northeastern.neu.edu",      password: "bob",      },
      {username: "charley@neu.edu",   password: "charley",   },
      {username: "jannunzi", password: "jannunzi"}
    ]
    console.log("inside login controller");
    var login = this;
    login.signin = signin;


    function signin(emailId,password) {
      console.log("inside signin function");

      for(var i in users){
        // console.log(i);
        if(users[i].username===emailId&&users[i].password===password){
          // $state.go('event');
          var result=true;
          $scope.msg="Success";

        }
      }

      if(result){
        $state.go('event');
      }
      else{
        $scope.msg="Failure";
      }
    }
  })
  .controller('EventCtrl',function($state,$rootScope,$scope) {

    //adding $scope.title for Jasmine testing purposes//
    var event=this;


    event.events=[
      {
        pic:"/android_asset/www/img/NUlogo.png",
        name:"NU Homecoming",
        group:"Association for Student Welfare",
        id:"123",
        dt:"11/09/2016"

      },
      {
        pic:"/android_asset/www/img/ionic.png",
        name:"Huskies vs Wildcats",
        group:"Northeastern Sports Association",
        id:"234",
        dt:"12/07/2016"

      }
    ]
    console.log("inside events controller");
    var event = this;





  })

;


