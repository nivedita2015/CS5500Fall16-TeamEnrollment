//Unit Test cases for EventDetailsController//
//recheck tests once bugs fixed. Issues with stateparams//

describe('EventDetailsController',function(){
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));
  beforeEach(module("ngCordova"));
  beforeEach(module("ionic"));

  var $controller;
  var state;
  var ionicPlatform;
  var cordovaGeolocation;
  var cordovaSocialSharing;
  var cordovaCalendar;

  beforeEach(inject(function(_$controller_,$state,$cordovaGeolocation,$cordovaSocialSharing,$cordovaCalendar,$ionicPlatform){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    ionicPlatform = $ionicPlatform;
    cordovaGeolocation = $cordovaGeolocation;
    cordovaSocialSharing = $cordovaSocialSharing;
    cordovaCalendar = $cordovaCalendar;

  }));

  //testing behaviour on add to calendar button click//
  describe('Event Details Controller', function() {
    it('check behaviour on add to calendar button click ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('eventDetails', {$state:state,rootScope:rootScope,$scope: $scope, $stateParams: $stateParams,$cordovaGeolocation: cordovaGeolocation,$cordovaSocialSharing:cordovaSocialSharing,$cordovaCalendar:cordovaCalendar,$ionicPlatform:ionicPlatform });
      controller.addToCalendar();
      //checking addCal variable set to true
      expect(controller.addCal).toEqual(true);
    });
  });

  //testing behaviour on chare to fb button click //
  describe('Event Details Controller', function() {
    it('check behaviour on share to facebook button click ', function() {
      var $scope = {};
      var rootScope = {};
      var $stateParams = {};
      var controller = $controller('eventDetails', {$state:state,rootScope:rootScope,$scope: $scope, $stateParams: $stateParams,$cordovaGeolocation: cordovaGeolocation,$cordovaSocialSharing:cordovaSocialSharing,$cordovaCalendar:cordovaCalendar,$ionicPlatform:ionicPlatform });
      controller.OtherShare();
      //checking shareOnFb variable set to true.
      expect(controller.share).toEqual(true);
    });
  });
});
