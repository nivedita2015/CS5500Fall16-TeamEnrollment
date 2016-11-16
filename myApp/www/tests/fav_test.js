
describe('FavCtrl', function() {
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;

  beforeEach(inject(function(_$controller_,$state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    state.expectTransitionTo('event');
  }));

  //Test case : click on event with event id: 234
  //Since event is exists in system, event details  page should load.
  describe('Favorites Controller', function() {
    it('checks event details page loaded successfully ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventClick('234');
      expect(state.current.name).toBe('eventDetails');
    });
  });
  //Test case : click on event with event id: 111 (emulating click)
  //Since event does not exist in system, event details  page should not load.
  describe('Favorites Controller', function() {
    it('checks event details page loaded successfully ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventClick('234');
      expect($scope.msg).toEqual('Failure');
      expect(state.current.name).toBe('main.favorites');

    });
  });

});

