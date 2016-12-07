
describe('EventCtrl', function() {
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));
  beforeEach(module('starter.constant'));
  beforeEach(module('stateMock'));

  // 'EventCtrl',function($state,$rootScope,$scope,$ionicFilterBar,EventService) {


  var $controller;
  var state;
  var EventService;
  var q;

  beforeEach(inject(function (_$controller_, $state, _EventService_, $q) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    EventService = _EventService_;
    q = $q;
    state.expectTransitionTo('eventDetails');
  }));

  //Test case userId = alice@husky.neu.edu
  describe('Event Controller', function () {
    it('checks getEvents is called or not ', function () {
      var deferred = q.defer();
      spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
      var $scope = {};
      var rootScope = {};
      var $ionicFilterBar = {};
      var controller = $controller('EventCtrl', {
        $state: state,
        rootScope: rootScope,
        $scope: $scope,
        $ionicFilterBar: $ionicFilterBar,
        EventService: EventService
      });

      // rootScope.apply();
      controller.getEvents('alice@husky.neu.edu');
      expect(EventService.getEvents).toHaveBeenCalledWith('alice@husky.neu.edu');
      expect($scope.error).toBe(undefined);
    });
  })


  //Test case for routing to eventDetails
  describe('Event Controller', function () {
    it('checks routing to event details ', function () {
      var deferred = q.defer();
      spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
      var $scope = {};
      var rootScope = {};
      var $ionicFilterBar = {};
      var controller = $controller('EventCtrl', {
        $state: state,
        rootScope: rootScope,
        $scope: $scope,
        $ionicFilterBar: $ionicFilterBar,
        EventService: EventService
      });

      // rootScope.apply();
      controller.eventClick('5842349d5faf958754a87c9a');
      expect(state.current.name).toBe('eventDetails');
    });
  })
});



describe('EventCtrl', function() {
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));
  beforeEach(module('starter.constant'));
  beforeEach(module('stateMock'));

  // 'EventCtrl',function($state,$rootScope,$scope,$ionicFilterBar,EventService) {


  var $controller;
  var state;
  var EventService;
  var q;

  beforeEach(inject(function (_$controller_, $state, _EventService_, $q) {
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    EventService = _EventService_;
    q = $q;
    state.expectTransitionTo('preferences.settings');
  }));

  //Test case for routing to preferences
  describe('Event Controller', function () {
    it('checks routing to preferences ', function () {
      var deferred = q.defer();
      spyOn(EventService, 'getEvents').and.returnValue(deferred.promise);
      var $scope = {};
      var rootScope = {};
      var $ionicFilterBar = {};
      var controller = $controller('EventCtrl', {
        $state: state,
        rootScope: rootScope,
        $scope: $scope,
        $ionicFilterBar: $ionicFilterBar,
        EventService: EventService
      });

      // rootScope.apply();
      controller.preferences();
      expect(state.current.name).toBe('preferences.settings');
    });
  })
});



