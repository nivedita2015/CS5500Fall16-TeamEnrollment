angular.module('starter.controllers', [])

  .controller('AppCtrl', function($scope, $ionicModal, $timeout) {

  // With the new view caching in Ionic, Controllers are only called
  // when they are recreated or on app start, instead of every page change.
  // To listen for when this page is active (for example, to refresh data),
  // listen for the $ionicView.enter event:
  //$scope.$on('$ionicView.enter', function(e) {
  //});

  // Form data for the login modal
  $scope.loginData = {};

  // Create the login modal that we will use later
  $ionicModal.fromTemplateUrl('templates/login.html', {
    scope: $scope
  }).then(function(modal) {
    $scope.modal = modal;
  });

  // Triggered in the login modal to close it
  $scope.closeLogin = function() {
    $scope.modal.hide();
  };

  // Open the login modal
  $scope.login = function() {
    $scope.modal.show();
  };

  // Perform the login action when the user submits the login form
  $scope.doLogin = function() {
    console.log('Doing login', $scope.loginData);

    // Simulate a login delay. Remove this and replace with your login
    // code if using a login system
    $timeout(function() {
      $scope.closeLogin();
    }, 1000);
  };
})
  .controller('PlaylistsCtrl', function($scope) {
  $scope.playlists = [
    { title: 'Reggae', id: 1 },
    { title: 'Chill', id: 2 },
    { title: 'Dubstep', id: 3 },
    { title: 'Indie', id: 4 },
    { title: 'Rap', id: 5 },
    { title: 'Cowbell', id: 6 }
  ];
})
  .controller('PlaylistCtrl', function($scope, $stateParams) {

    $scope.title = 'testing';

  })
  .controller('LoginCtrl', function($state,$rootScope,$scope) {

    //adding $scope.title for Jasmine testing purposes//
    $scope.title = 'testing';
    $scope.val = 'null';


    var users=[
      {username: "alice@husky.neu.edu",    password: "alice",    },
      {username: "bob@northeastern.neu.edu",      password: "bob",      },
      {username: "charley@neu.edu",   password: "charly",   },
      {username: "jannunzi", password: "jannunzi"}
    ]
    console.log("inside login controller");
    var login = this;
    login.signin = signin;

    console.log($scope.val);


    function signin(emailId,password) {
      console.log("inside signin function");
      console.log(emailId+" "+password);

      for(var i in users){
        // console.log(i);
        if(users[i].username===emailId&&users[i].password===password){
          // $state.go('event');
          var result=true;

        }
      }

      if(result){
        $state.go('event');
      }
      else{
        login.error="No data found in controller";
      }
    }
  })

;


