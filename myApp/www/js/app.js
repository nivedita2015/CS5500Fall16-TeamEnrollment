// Ionic Starter App

// angular.module is a global place for creating, registering and retrieving Angular modules
// 'starter' is the name of this angular module example (also set in a <body> attribute in index.html)
// the 2nd parameter is an array of 'requires'
// 'starter.controllers' is found in controllers.js
angular.module('starter', ['ionic', 'starter.controllers','starter.services','starter.constant','ngCordova','ui.router','jett.ionic.filter.bar','ngCordovaBeacon'])

.run(function($ionicPlatform) {
  $ionicPlatform.ready(function() {
    // Hide the accessory bar by default (remove this to show the accessory bar above the keyboard
    // for form inputs)
    if (window.cordova && window.cordova.plugins.Keyboard) {
      cordova.plugins.Keyboard.hideKeyboardAccessoryBar(true);
      cordova.plugins.Keyboard.disableScroll(true);

    }
    if (window.StatusBar) {
      // org.apache.cordova.statusbar required
      StatusBar.styleDefault();
    }

    // window.addEventListener('BluetoothStatus.enabled', function() {
    //   console.log('Bluetooth has been enabled');
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Bluetooth enabled!',
    //     template: errMsg
    //   });
    // });
    //
    // window.addEventListener('BluetoothStatus.disabled', function() {
    //   console.log('Bluetooth has been disabled');
    //   var alertPopup = $ionicPopup.alert({
    //     title: 'Bluetooth disabled!',
    //     template: errMsg
    //   });
    // });

     cordova.plugins.BluetoothStatus.promptForBT();
    // // cordova.plugins.BluetoothStatus.enableBT();
    // cordova.plugins.locationManager.requestAlwaysAuthorization()


  });
})
.config(function($stateProvider, $urlRouterProvider) {
  $stateProvider
    .state('app', {
      url: '/app',
      abstract: true,
      templateUrl: 'templates/menu.html',
      controller: 'AppCtrl'
  })
    .state('login', {
      url: '/login',
      templateUrl: 'views/login.html',
      controller: 'LoginCtrl as login'
    })
    .state('beacon', {
      url: '/beacon',
      templateUrl: 'views/beacon.html',
      controller: 'BeaconCtrl'
    })
    .state('event', {
      url: '/event',
      templateUrl: 'views/event.html',
      controller: 'EventCtrl as event'
    })
    .state('eventDetails', {
      url: '/eventDetails',
      templateUrl: 'views/eventDetails.html',
      params: {'id':null},
      controller: 'EventDetailsCtrl as eventDetails',
    })
    .state('preferences', {
      url: '/preferences',
      abstract: true,
      templateUrl: 'views/userPreference.html',
      // controller: 'PreferencesCtrl'
    })
    .state('preferences.settings', {
      url: '/settings',
      views: {
        'settings': {
          templateUrl: 'views/settings.html',
          controller: 'SettingsCtrl as settings'
        }
      }
    })
    .state('preferences.favorites', {
      url: '/favorites',
      views: {
        'favorites': {
          templateUrl: 'views/favorites.html',
          controller: 'FavCtrl as event'
        }
      }
    })
    .state('preferences.events', {
      url: '/events',
      views: {
        'events': {
          templateUrl: 'views/allEvents.html',
          controller: 'allEventsCtrl as event'
        }
      }
    })

    .state('preferences.nevents', {
      url: '/nevents',
      views: {
        'nevents': {
          templateUrl: 'views/beacon.html',
          controller: 'BeaconCtrl as beacon'
        }
      }
    })

  ;
  // if none of the above states are matched, use this as the fallback
  $urlRouterProvider.otherwise('/login');
});
