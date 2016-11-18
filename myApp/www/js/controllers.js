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
          // $scope.msg="Success";

        }
      }

      if(result){
        $state.go('event');
      }
      else{
        $scope.msg="Failure";
        login.msg = 'Failure';
      }
    }
  })
  .controller('EventCtrl',function($state,$rootScope,$scope) {

    var event=this;

    event.events=[
      {
        pic:"/img/NUlogo.png",
        name:"NU Homecoming",
        group:"Association for Student Welfare",
        id:"123",
        dt:"11/09/2016"

      },
      {
        pic:"/img/ionic.png",
        name:"Huskies vs Wildcats",
        group:"Northeastern Sports Association",
        id:"234",
        dt:"12/07/2016"

      }
    ]
    console.log("inside events controller");
    var event = this;
    event.eventClick = eventClick;
    event.preferences = preferences;

    function eventClick(id) {
      console.log("inside eventClick");
      var result="Failure";
      for(var i in event.events){
        if(event.events[i].id===id){
          result="Success";
          $state.go('eventDetails',{'id':id});
        }
      }
      if(result==="Failure"){
        $scope.msg="Failure";
      }
    }

    function preferences(){
      console.log("inside preferences");
      $state.go('preferences.settings');
    }
  })
  .controller('EventDetailsCtrl',function($state,$rootScope,$scope,$stateParams,$cordovaGeolocation,$cordovaSocialSharing) {

    var eventDetails=this;


    var events=[
      {
        pic:"/img/NUlogo.png",
        map:"/img/ionic.png",
        name:"NU Homecoming",
        group:"Association for Student Welfare",
        id:"123",
        dt:"11/09/2016",
        desc:"This should be the description of the event. The details are unique to the event",
        lat:"42.338452",
        longt:"-71.087834",
      },
      {
        pic:"/img/ionic.png",
        map:"/img/NUlogo.png",
        name:"Library events",
        group:"Sigma Kappa",
        id:"234",
        dt:"12/17/2016",
        desc:"This should be the description of the event. The details are unique to the event",
        lat:"42.338628",
        longt:"-71.092285",
      }

    ];
    eventDetails.init=init;
    eventDetails.share = share;

    var id=$stateParams.id;
    console.log("after id"+id);
    function init() {

      console.log("inside event details init");

      eventDetails.shareOnFb = false;
      eventDetails.addToCalendar = false;


      for(var i in events){
        if(events[i].id===id){
          console.log("id matched "+id);
          eventDetails.event=events[i];
          console.log(eventDetails.event);
        }
      }
      var options = {timeout: 10000, enableHighAccuracy: true};

      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng(eventDetails.event.lat,eventDetails.event.longt);
        var mapOptions = {
          center: latLng,
          zoom: 17,
          mapTypeId: google.maps.MapTypeId.ROADMAP
        };
        $scope.map = new google.maps.Map(document.getElementById("map"), mapOptions);
        google.maps.event.addListenerOnce($scope.map, 'idle', function(){
          var marker = new google.maps.Marker({
            map: $scope.map,
            animation: google.maps.Animation.DROP,
            position: latLng
          });
        });

        eventDetails.mapLoaded = true;
      }, function(error){
        console.log("Could not get location");
        eventDetails.mapLoaded = false;
      });}
    init();
    function share(){

      $cordovaSocialSharing
        .shareViaFacebook('Hello', null, 'http://test.com')
        .then(function(result) {
          alert('success');
        }, function(err) {
          alert('error');
          // An error occurred. Show a message to the user
        });



    }
    console.log("inside events details controller");



})
  .controller('PreferencesCtrl', function($state,$rootScope,$scope){
  console.log("inside preferences ctrl");

  })
  .controller('FavCtrl', function($state,$rootScope,$scope){
  })
  .controller('SettingsCtrl', function($state,$rootScope,$scope){
    console.log("inside settings controller");
    var settings = this;
    this.notificationChange = notificationChange;
    this.bluetoothChange = bluetoothChange;
    this.locationChange = locationChange;
    this.favoritesPage = favoritesPage;
    this.allEventsPage = allEventsPage;
    this.eventPage = eventPage;

    function notificationChange(){
      console.log("notification "+$scope.notification.checked);

    }
    function bluetoothChange(){
      console.log("bluetooth "+$scope.bluetooth.checked);

    }
    function locationChange(){
      console.log("location "+$scope.location.checked);

    }
    $scope.notification = {checked : true};
    $scope.bluetooth = {checked : true};
    $scope.location = {checked : true};


    function favoritesPage(){
      $state.go('preferences.favorites');
    }

    function allEventsPage(){
      $state.go('preferences.events');
    }
    function eventPage(){
      $state.go('event');
    }

  })
;

