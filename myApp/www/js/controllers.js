angular.module('starter.controllers', ['starter.services','starter.constant','ui.router'])

  .controller('LoginCtrl', function($state,$rootScope,$scope,LoginService) {

    $rootScope.user = null;
    console.log("inside login controller");
    var login = this;
    login.signin = signin;
    login.beacon = beacon;


    function init(){
      login.msg = null;
    }

    init();

    function beacon(){
      alert("going to beacon");
      $state.go('beacon');
    }

    function signin(emailId,password){
      console.log('inside signin');
      LoginService.login(emailId,password).then(function(res){
          // alert('inside login service return');
          console.log(res);
          if(res == 'False'){
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
        // login.error = 'error';

      })
    }
  })
  .controller('EventCtrl',function($state,$rootScope,$scope,$ionicFilterBar,EventService) {
    // console.log("inside event controller"+$rootScope.user);
    var event = this;
    event.getEvents = getEvents;
    event.eventClick = eventClick;
    event.preferences = preferences;
    event.showFilterBar=showFilterBar;
    var filterBarInstance;
    var a=['/android_asset/www/img/NUlogo.png','/android_asset/www/img/basketball.png','/android_asset/www/img/ionic.png'];

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

    function showFilterBar() {
      filterBarInstance = $ionicFilterBar.show({
        items: $scope.events,
        update: function (filteredItems) {
          $scope.events = filteredItems;
          $scope.array1=filteredItems;
        },
        filterProperties: 'Name'
      });
      console.log($ionicFilterBar);
    };

    function eventClick(id){
      $rootScope.eId = id;
      $state.go('eventDetails',{'id':id});
    }

    function preferences(){
      // alert("inside preferences");
      $state.go('preferences.settings');
    }
  })
  .controller('EventDetailsCtrl',function($state,$rootScope,$scope,$cordovaGeolocation,$cordovaSocialSharing,$cordovaCalendar,EventDetailsService) {
    // console.log("inside event details controller");

    var eventDetails=this;
    eventDetails.getEventDetails = getEventDetails;
    eventDetails.init=init;
    eventDetails.OtherShare = OtherShare;
    eventDetails.addToCalendar = addToCalendar;

    function init(){
      getEventDetails($rootScope.eId);

      var options = {timeout: 10000, enableHighAccuracy: true};
      $cordovaGeolocation.getCurrentPosition(options).then(function(position){
        var latLng = new google.maps.LatLng($scope.event.Latitude,$scope.event.Longitude);
        // alert($scope.event.Latitude+""+$scope.event.Longitude);
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
      }, function(err){
        alert("Could not get location "+err);
        eventDetails.mapLoaded = false;
      });
    }

    function getEventDetails(eid){
      EventDetailsService.getEventDetails(eid)
        .then(function(res){
          console.log(res);
          if(res != 'False'){
            $scope.event = res;
          }
          else{
            $scope.event = [];
          }
        })
    }

    init();

    function OtherShare(){
      $cordovaSocialSharing
        .share('Check out this cool event Im attending!','Event in NU Events', null, 'http://www.NUEvents.com/event?id=1234')
        .then(function(result) {
          $scope.share = true;
        }, function(err) {
        });
    }

    function addToCalendar(){
      $cordovaCalendar.createEventInteractively({
        title: $scope.event.Name,
        location: $scope.event.Location,
        notes: $scope.event.Description,
        startDate: new Date($scope.event.Year,$scope.event.Month,$scope.event.Day,$scope.event.Hour,$scope.event.Min,0,0,0),
        endDate: new Date($scope.event.Year,$scope.event.Month,$scope.event.Day,$scope.event.Hour+4,$scope.event.Min,0,0,0),
      }).then(function (result) {
        // success
      }, function (err) {
        // error
      });
      $scope.addCal = true;
    }
  })
  .controller('PreferencesCtrl', function($state,$rootScope,$scope){
  })
  .controller('FavCtrl', function($state,$rootScope,$scope){

    var event=this;

    event.events=[
      {
        pic:"/android_asset/www/img/NUlogo.png",
        group:"Association for Student Welfare",
        id:"123",
        true:"yes",
        change:"The Event will be removed from your preference"
      },
      {
        pic:"/android_asset/www/img/ionic.png",
        group:"Northeastern Sports Association",
        id:"234",
        true:"no",
        change:"The Event will be added to your preference"
      },
      {
        pic:"/android_asset/www/img/ionic.png",
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
  .controller('SettingsCtrl', function($state,$rootScope,$scope,$ionicPlatform,$cordovaBluetoothSerial) {
    // $scope.notification = {checked: true};
    // $scope.bluetooth = {checked: true};
    // $scope.location = {checked: true};
    var settings = this;
    this.favoritesPage = favoritesPage;
    this.allEventsPage = allEventsPage;
    this.eventPage = eventPage;
    this.neventPage = neventPage;
    settings.notify = notify;
    settings.init=init;
    settings.notifyLocation=notifyLocation;
    // settings.notifyBluetooth=notifyBluetooth;


    function init() {
      $scope.notification = {checked: true};
      // $scope.location = {checked: true};

      cordova.plugins.diagnostic.isLocationEnabled(function(available){
        if(available){
          // alert("location on")
          $scope.location = {checked: true};
        }
        else {
          // alert("location off")
          $scope.location = {checked: false};
        }

      }, function(error){
        // alert("location off")
        $scope.location = {checked: false};
      });


      $cordovaBluetoothSerial.isEnabled()
        .then(function (success) {
            $scope.bluetooth = {checked: true};
        }, function (err) {
          $scope.bluetooth = {checked: false};
        })
    }
    init();

    function notifyLocation() {
      cordova.plugins.diagnostic.switchToLocationSettings()
        .then(function (success) {
          // alert("true")
        }, function (err) {
          // alert("false")
        })
    }


    function notify(event) {

      if(event==="false"){
        $ionicPlatform.ready(function () {
          // console.log('inside ionic platform ready');


          try {
            // console.log('inside try');
            if (window.cordova) {
              $cordovaBluetoothSerial.showBluetoothSettings()
                .then(function (success) {
                  $state.go('preferences.settings');
                }, function (err) {
                  // alert("Bluetooth is disabled");
                })
            }
            else {
              alert('not cordova');
            }
          }
          catch (err) {
            alert(err.message);
          }


        });
      }

      else{
        $ionicPlatform.ready(function () {
          // console.log('inside ionic platform ready');


          try {
            // console.log('inside try');
            if (window.cordova) {
              $cordovaBluetoothSerial.showBluetoothSettings()
                .then(function (success) {
                  $state.go('preferences.settings');
                }, function (err) {
                  $state.go('preferences.settings');
                })
            }
            else {
              alert('not cordova');
            }
          }
          catch (err) {
            alert(err.message);
          }


        });
      }

  }

    // $ionicPlatform.ready(function() {
    //
    //   cordova.plugins.BluetoothStatus.enableBT();
    //
    //
    //   cordova.plugins.locationManager.isBluetoothEnabled()
    //     .then(function(isEnabled) {
    //       if (isEnabled) {
    //         alert("Bluetooth is enabled");
    //         // console.log("Bluetooth is enabled: " + isEnabled);
    //         $scope.bluetoothIsEnabled = isEnabled;
    //       } else {
    //         alert("Bluetooth is disabled");
    //         // console.log("Bluetooth is disabled: " + isEnabled);
    //         $scope.bluetoothIsEnabled = isEnabled;
    //       }
    //     })
    //     .fail(console.error)
    //     .done();
    // });



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
    function neventPage() {
      $state.go('preferences.nevents');
    }

  })
  .controller('allEventsCtrl', function($state,$rootScope,$scope){
    var event=this;
      event.events=[ 
      { 
        pic:"/android_asset/www/img/NUlogo.png", 
        group:"Association for Student Welfare", 
        id:"123",     true:"no", 
        change:"The Event will be added to your preference"   }, 

        { 
          pic:"/android_asset/www/img/basketball.png", 
          group:"NU BasketBall Club", 
          id:"234",     true:"no", 
          change:"The Event will be added to your preference"   },

           { 
             pic:"/android_asset/www/img/ionic.png", 
             group:"Northeastern Sports Association", 
             id:"345",     true:"no", 
             change:"The Event will be added to your preference"   }, 
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
  .controller("BeaconCtrl", function($state,$scope, $rootScope, $ionicPlatform, $cordovaBeacon) {

    var beacon=this;
    $scope.eventClick=eventClick;

    // alert("loaded controller");

    $scope.beacons = {};
     $scope.event1= {
       _id:"5842349d5faf958754a87c9a",
        pic:"/android_asset/www/img/NUlogo.png",
        group:"Book Reading",
        time:"11:00 AM", 
        place:"Boston" ,
        bid: "56502a70-62a9-51f9-2784-cb8ccdf83551"};

    $scope.event2= {
      _id:"5848e96b098959afebd8df6f",
      pic:"/android_asset/www/img/ionic.png",
      group:"Northeastern Sports Association",
      time:"5:00 PM",
      place:"CAMBRIDGE" ,
      bid: "d46375f6-6558-f8c1-f944-cf3e8a620c1a"};

    $scope.event3= {
      _id:"5842349d5faf958754a87c9b",
      pic:"/android_asset/www/img/basketball.png",
      group:"BasketBall Basics 1",
      time:"11:00 AM",
      place:"Boston" ,
      bid: "954caf6c-3762-cfa8-e122-d492cf67c4fb"};

    var events=[
      {
        pic:"/android_asset/www/img/NUlogo.png",
        group:"Association for Student Welfare",
        id:"123",     true:"yes",
        change:"The Event will be removed from your preference" ,
        bid: "56502A70-62A9-51F9-2784-CB8CCDF83551"},

      {
        pic:"/android_asset/www/img/ionic.png",
        group:"Northeastern Sports Association",
        id:"234",     true:"no",
        change:"The Event will be added to your preference" ,
        bid: "D46375F6-6558-F8C1-F944-CF3E8A620C1A"},

      {
        pic:"/android_asset/www/img/ionic.png",
        group:"Northeastern Sports Association",
        id:"345",     true:"yes",
        change:"The Event will be removed from your preference",
        bid: "954CAF6C-3762-CFA8-E122-D492CF67C4FB"   },
    ];

    function eventClick(id){
      // alert(id);
      $rootScope.eId = id;
      $state.go('eventDetails',{'id':id});
    }

    $ionicPlatform.ready(function() {

      $cordovaBeacon.requestWhenInUseAuthorization();

      $rootScope.$on("$cordovaBeacon:didRangeBeaconsInRegion", function(event, pluginResult) {
        // alert("inside rootscope on")
        var uniqueBeaconKey;

        // alert("plugin result is "+pluginResult.beacons.length);
        for(var i = 0; i < pluginResult.beacons.length; i++) {
          uniqueBeaconKey = pluginResult.beacons[i].uuid + ":" + pluginResult.beacons[i].major + ":" + pluginResult.beacons[i].minor;
          // alert(pluginResult.beacons[i].uuid);
          // for(j in events){
          //   if(events[j].bid===pluginResult.beacons[i].uuid){
          //     pluginResult.beacons[i].event=events[j];
          //   }
          // }
          $scope.beacons[uniqueBeaconKey] = pluginResult.beacons[i];

        }
        $scope.$apply();

      });
      var value=["56502A70-62A9-51F9-2784-CB8CCDF83551",
                 "D46375F6-6558-F8C1-F944-CF3E8A620C1A",
                 "954CAF6C-3762-CFA8-E122-D492CF67C4FB"
                  ];
      for(var i in value){
        $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote"+i,value[i]));
      }

      // $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "56502A70-62A9-51F9-2784-CB8CCDF83551"));
      // $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "954CAF6C-3762-CFA8-E122-D492CF67C4FB"));
      // $cordovaBeacon.startRangingBeaconsInRegion($cordovaBeacon.createBeaconRegion("estimote", "D46375F6-6558-F8C1-F944-CF3E8A620C1A"));



    })
  })
;

