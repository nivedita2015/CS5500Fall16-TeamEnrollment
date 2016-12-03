angular.module('starter.controllers', ['starter.services','starter.constant','ui.router'])

  .controller('LoginCtrl', function($state,$rootScope,$scope,LoginService) {

    $rootScope.user = null;
    console.log("inside login controller");
    var login = this;
    login.signin = signin;


    function init(){
      getLoginPage();
    }

    function getLoginPage(){
    }

    init();

    function signin(emailId,password){
      // alert('inside signin');
      LoginService.login(emailId,password).then(function(res){
          // alert('inside login service return');
          console.log(res);
          if(res.data == 'False'){
            // alert('Wrong Username/Password. Try again!');
            login.msg = 'true'
          }
          else{
            // alert('inside correct user');
            // login.msg = 'true'
            $rootScope.user = res;
            $state.go('event');
            login.msg = null;
          }

        },function(err){
        console.log("error");
      })
    }
  })
  .controller('EventCtrl',function($state,$rootScope,$scope,$ionicFilterBar,EventService) {
    console.log("inside event controller"+$rootScope.user);
    var event = this;
    event.getEvents = getEvents;
    var filterBarInstance;
    var a=['../img/ionic.png','../img/NUlogo.png'];


    function init(){
      getEvents($rootScope.user);
    }

    function getEvents(userId){
      EventService.getEvents(userId)
        .then(function(res){
          console.log(res);
          if(res.length != 0){
            for(i=0;i<res.length;i++){
              res[i].pic = a[i];
            }
            $scope.events = res;
          }
          else{
            $scope.events = [];
          }
        })
    }

    init();

    event.eventClick = eventClick;
    event.preferences = preferences;
    event.showFilterBar=showFilterBar;

    function showFilterBar() {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.events,
        update: function (filteredItems) {
          $scope.events = filteredItems;
          $scope.array1=filteredItems;
        },
        filterProperties: 'name'
      });
      console.log($ionicFilterBar);
    };


    //not changed below this//

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
  .controller('EventDetailsCtrl',function($state,$rootScope,$scope,$stateParams,$cordovaGeolocation,$cordovaSocialSharing,$cordovaCalendar,$ionicPlatform) {
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
    eventDetails.OtherShare = OtherShare;
    eventDetails.addToCalendar = addToCalendar;

    var id=$stateParams.id;
    // console.log("after id"+id);
    function init() {
      console.log("inside event details init");
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

    function OtherShare(){
      $ionicPlatform.ready(function(){
        // alert('inside ionic platform ready');
        try{
          if(window.cordova){
            $cordovaSocialSharing
              .shareViaFacebook('Hello', null, 'https://play.google.com/store/apps/details?id=com.prantikv.digitalsignaturemaker')
              .then(function(result) {
                // Success!
                alert('success');
                $scope.share = true;
              }, function(err) {
                // An error occurred. Show a message to the user
                alert('failure'+err);
              });
          }
          else{
            alert('not cordova');
          }
        }
        catch(err){
          alert(err.message);
        }

      });
    }

    function addToCalendar(){
      $cordovaCalendar.createEventInteractively({
        title: 'Test',
        location: 'Test',
        notes: 'Test',
        startDate: new Date(2015, 0, 6, 18, 30, 0, 0, 0),
        endDate: new Date(2015, 1, 6, 12, 0, 0, 0, 0)
      }).then(function (result) {
        // success
      }, function (err) {
        // error
      });
      $scope.addCal = true;
    }
  })
  .controller('PreferencesCtrl', function($state,$rootScope,$scope){
  console.log("inside preferences ctrl");



  })
  .controller('FavCtrl', function($state,$rootScope,$scope){

    var event=this;

    event.events=[
      {
        pic:"/img/NUlogo.png",
        group:"Association for Student Welfare",
        id:"123",
        true:"yes",
        change:"The Event will be removed from your preference"
      },
      {
        pic:"/img/ionic.png",
        group:"Northeastern Sports Association",
        id:"234",
        true:"no",
        change:"The Event will be added to your preference"
      },
      {
        pic:"/img/ionic.png",
        group:"Northeastern Sports Association",
        id:"345",
        true:"yes",
        change:"The Event will be removed from your preference"
      },
    ]
    event.alterFavourite=alterFavourite;

    function alterFavourite(id) {
      console.log("inside alterFavourite");
      var result="Failure";
      for(var i in event.events){
        if(event.events[i].id===id){
          result="Success";
          if(event.events[i].true==="yes"){
            console.log("true yes")
            event.makeChange="no";
            event.events[i].true="no";
            event.events[i].change="The Event will be added from your preference";
            event.events.splice(i,1);
            $scope.msg1="true";
          }else{
            event.makeChange="yes";
            console.log("true no")
            event.events[i].true="yes";
            event.events[i].change="The Event will be removed to your preference";
            $scope.msg1="false";
          }

          // $state.go('preferences.favorites');
        }
      }
      if(result==="Failure"){
        $scope.msg="Failure";
      }
    }

    console.log("favorite controller")

  })
  .controller('SettingsCtrl', function($state,$rootScope,$scope){
    console.log("inside settings controller");
    $scope.notification = {checked : true};
    $scope.bluetooth = {checked : true};
    $scope.location = {checked : true};

    var settings = this;
    // this.notificationChange = notificationChange;
    // this.bluetoothChange = bluetoothChange;
    // this.locationChange = locationChange;
    this.favoritesPage = favoritesPage;
    this.allEventsPage = allEventsPage;
    this.eventPage = eventPage;

    cordova.plugins.diagnostic.registerBluetoothStateChangeHandler(function(state){
      // "unknown", "resetting", "unsupported", "unauthorized", "powered_off", "powered_on"
      if (state == "powered_on") {
        $scope.bluetoothIsEnabled = true;
      } else {
        $scope.bluetoothIsEnabled = false;
      }
    });


    // function notificationChange(){
    //   console.log("notification "+$scope.notification.checked);
    //
    // }
    // function bluetoothChange(){
    //   console.log("bluetooth "+$scope.bluetooth.checked);
    //
    // }
    // function locationChange(){
    //   console.log("location "+$scope.location.checked);
    //
    // }
    //
    //

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
  .controller('allEventsCtrl', function($state,$rootScope,$scope){
    var event=this;
      event.events=[ 
      { 
        pic:"/img/NUlogo.png", 
        group:"Association for Student Welfare", 
        id:"123",     true:"yes", 
        change:"The Event will be removed from your preference"   }, 

        { 
          pic:"/img/ionic.png", 
          group:"Northeastern Sports Association", 
          id:"234",     true:"no", 
          change:"The Event will be added to your preference"   },

           { 
             pic:"/img/ionic.png", 
             group:"Northeastern Sports Association", 
             id:"345",     true:"yes", 
             change:"The Event will be removed from your preference"   }, 
      ]

     event.alterFavourite=alterFavourite;  

    function alterFavourite(id) { 
      console.log("inside alterFavourite"); 
      var result="Failure"; 
      for(var i in event.events){ 
        if(event.events[i].id===id){ 
          result="Success"; 
          if(event.events[i].true==="yes"){ 
            console.log("true yes") 
            event.makeChange="no"; 
            event.events[i].true="no"; 
            event.events[i].change="The Event will be added from your preference"; 
            $scope.msg1="true";       }

            else{ 
            event.makeChange="yes"; 
            console.log("true no") 
            event.events[i].true="yes"; 
            event.events[i].change="The Event will be removed to your preference"; 
            $scope.msg1="false"; 
          }  
            // $state.go('preferences.favorites'); 
          } 
      } 
          if(result==="Failure")
          {     $scope.msg="Failure"; 
          } }
            
          console.log("all Events controller")


  })
;

