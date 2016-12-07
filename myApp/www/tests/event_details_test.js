//Unit Test cases for EventDetailsController//

// describe('EventDetailsController',function(){
//   beforeEach(module('starter.services'));
//   beforeEach(module('starter.controllers'));
//   beforeEach(module('starter.constant'));
//   beforeEach(module('stateMock'));
//   beforeEach(module("ngCordova"));
//   beforeEach(module("ionic"));
//
//   var $controller;
//   var state;
//   var ionicPlatform;
//   var cordovaGeolocation;
//   var cordovaSocialSharing;
//   var cordovaCalendar;
//   var EventDetailsService;
//
//   beforeEach(inject(function(_$controller_,$state,$cordovaGeolocation,$cordovaSocialSharing,$cordovaCalendar,$ionicPlatform,_EventDetailsService_){
//     // The injector unwraps the underscores (_) from around the parameter names when matching
//     $controller = _$controller_;
//     state = $state;
//     ionicPlatform = $ionicPlatform;
//     cordovaGeolocation = $cordovaGeolocation;
//     cordovaSocialSharing = $cordovaSocialSharing;
//     cordovaCalendar = $cordovaCalendar;
//     EventDetailsService = _EventDetailsService_;
//
//
//   }));
//
//   // $state,$rootScope,$scope,$stateParams,$cordovaGeolocation,$cordovaSocialSharing,$cordovaCalendar,$ionicPlatform,EventDetailsService) {
//
//
//
//     //testing behaviour on add to calendar button click//
//   describe('Event Details Controller', function() {
//     it('check behaviour on add to calendar button click ', function() {
//       var $scope = {};
//       var rootScope = {};
//       var controller = $controller('EventDetailsCtrl', {$state:state,rootScope:rootScope,$scope: $scope, $cordovaGeolocation: cordovaGeolocation,$cordovaSocialSharing:cordovaSocialSharing,$cordovaCalendar:cordovaCalendar,$ionicPlatform:ionicPlatform,EventDetailsService:EventDetailsService });
//       controller.addToCalendar();
//       //checking addCal variable set to true
//       expect(controller.addCal).toEqual(true);
//     });
//   });
//
//   //testing behaviour on chare to fb button click //
//   // describe('Event Details Controller', function() {
//   //   it('check behaviour on share to facebook button click ', function() {
//   //     var $scope = {};
//   //     var rootScope = {};
//   //     var $stateParams = {};
//   //     var controller = $controller('eventDetails', {$state:state,rootScope:rootScope,$scope: $scope, $stateParams: $stateParams,$cordovaGeolocation: cordovaGeolocation,$cordovaSocialSharing:cordovaSocialSharing,$cordovaCalendar:cordovaCalendar,$ionicPlatform:ionicPlatform });
//   //     controller.OtherShare();
//   //     //checking shareOnFb variable set to true.
//   //     expect(controller.share).toEqual(true);
//   //   });
//   // });
// });




describe('EventDetailsController', function() {
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));
  beforeEach(module('starter.constant'));
  beforeEach(module('stateMock'));
  beforeEach(module("ngCordova"));
  beforeEach(module("ngCordovaMocks"));

  var $controller;
  var state;
  var EventDetailsService;
  var q;
  var options = {timeout: 10000, enableHighAccuracy: true};



  beforeEach(inject(function (_$controller_, $state, _EventDetailsService_, $q,_$cordovaGeolocation_,_$cordovaSocialSharing_) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    EventDetailsService = _EventDetailsService_;
    q = $q;
    $cordovaGeolocation = _$cordovaGeolocation_;
    $cordovaSocialSharing = _$cordovaSocialSharing_;
    // state.expectTransitionTo('eventDetails');
  }));

  //Test case userId = alice@husky.neu.edu
  describe('Event Details Controller', function () {
    it('checks getEventsDetails is called or not ', function () {
      var deferred = q.defer();
      spyOn(EventDetailsService, 'getEventDetails').and.returnValue(deferred.promise);
      var $scope = {};
      var rootScope = {};
      // var $cordovaGeolocation = {};
      // var $cordovaSocialSharing = {};
      var $cordovaCalendar = {};
      var controller = $controller('EventDetailsCtrl', {
        $state: state,
        rootScope: rootScope,
        $scope: $scope,
        $cordovaGeolocation:$cordovaGeolocation,
        $cordovaSocialSharing:$cordovaSocialSharing,
        $cordovaCalendar:$cordovaCalendar,
        EventDetailsService: EventDetailsService
      });

      controller.getEventDetails('5842349d5faf958754a87c9a');
      expect(EventDetailsService.getEventDetails).toHaveBeenCalledWith('5842349d5faf958754a87c9a');

      controller.OtherShare();
    });
  });


  //Test case for routing to eventDetails
  // describe('Event Controller', function () {
  //   it('checks routing to event details ', function () {
  //     var deferred = q.defer();
  //     spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
  //     var $scope = {};
  //     var rootScope = {};
  //     var $ionicFilterBar = {};
  //     var controller = $controller('EventCtrl', {
  //       $state: state,
  //       rootScope: rootScope,
  //       $scope: $scope,
  //       $ionicFilterBar: $ionicFilterBar,
  //       EventService: EventService
  //     });
  //
  //     // rootScope.apply();
  //     controller.eventClick('5842349d5faf958754a87c9a');
  //     expect(state.current.name).toBe('eventDetails');
  //   });
  // })
});
