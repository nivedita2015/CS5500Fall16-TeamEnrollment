
describe('FavCtrl', function() {
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;
  var $ionicPopup;
  var $q;
  // var timeout;

  beforeEach(inject(function(_$controller_,$state,_$ionicPopup_,_$q_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    $ionicPopup = _$ionicPopup_;
    $q = _$q_;
    state.expectTransitionTo('event');
  }));

  //Test case : click on event with event id: 234
  //Since event is exists in system, event details  page should load.
  describe('Favorites Controller', function() {
    it('checks event details page loaded successfully ', function() {
      var scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,$rootScope:rootScope,$scope: scope});
      controller.eventClick('234');
      expect(state.current.name).toBe('eventDetails');
    });
  });
  //Test case : click on event with event id: 111 (emulating click)
  //Since event does not exist in system, event details  page should not load.
  describe('Favorites Controller', function() {
    it('checks event details page loaded successfully ', function() {
      var scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,$rootScope:rootScope,$scope: scope});
      controller.eventClick('111');
      expect($scope.msg).toEqual('Failure');
      expect(state.current.name).toBe('preferences.favorites');

    });
  });

  //Test case : click on settings tab
  //User should be routed to settings state
  describe('Favorites Controller', function() {
    it('checks settings page loaded successfully ', function() {
      var scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,$rootScope:rootScope,$scope: scope});
      controller.settingsClick();
      expect(state.current.name).toBe('preferences.settings');
    });
  });

  //Test case : click on all events tab
  //User should be routed to all events state
  describe('Favorites Controller', function() {
    it('checks all events page loaded successfully ', function() {
      var scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,$rootScope:rootScope,$scope: scope});
      controller.allEventsClick();
      expect(state.current.name).toBe('preferences.events');
    });
  });


  //Testing popup when favourited event is un-favourited.
  describe('FavCtrl', function() {

    it('should call confirmClicked function if ok is clicked in the confirm popup', function() {
      var deferred = $q.defer();
      deferred.resolve(true); //ok is clicked
      spyOn($ionicPopup, 'confirm').and.callFake(function(){return deferred.promise});
      scope.openPopup();
      scope.$digest();
      expect(scope.confirmClicked).toHaveBeenCalled();
    });

    it('should not call confirmClicked if cancel is clicked in the confirm popup', function() {
      var deferred = $q.defer();
      deferred.resolve(false); //cancel is clicked
      spyOn($ionicPopup, 'confirm').and.callFake(function(){return deferred.promise});
      scope.openPopup();
      scope.$digest();
      expect(scope.confirmClicked).not.toHaveBeenCalled();
    });
  });






});

