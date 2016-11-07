describe('EventController',function(){
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;

  beforeEach(inject(function(_$controller_,$state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    state.expectTransitionTo('eventDetails');
  }));

  describe('Event Controller', function() {
    it('checks if navigated to event details page ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventClick();
      expect(state.current.name).toBe('eventDetails');
    });
  });

});
