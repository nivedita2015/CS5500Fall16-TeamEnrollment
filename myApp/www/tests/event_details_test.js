//Unit Test cases for EventDetailsController//

describe('EventDetailsController',function(){
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;

  beforeEach(inject(function(_$controller_,$state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    // state.expectTransitionTo('eventDetails');
  }));

  //testing behaviour on add to calendar button click//
  describe('Event Controller', function() {
    it('check behaviour on add to calendar button click ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.calendarClick();
      //checking page is not routed out of event page.
      expect(state.current.name).toBe('event');
      //checking addToCalendar variable set to true
      expect(controller.addToCalendar).toEqual('true');
    });
  });

  //testing behaviour on chare to fb button click //
  describe('Event Controller', function() {
    it('check behaviour on share to facebook button click ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.shareClick();
      //checking page is not routed out of event page.
      expect(state.current.name).toBe('event');
      //checking shareOnFb variable set to true.
      expect(controller.shareOnFb).toEqual('true');
    });
  });

  //testing variable values when no button is clicked//
  describe('Event Controller', function() {
    it('check behaviour on share to facebook button click ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.shareClick();
      //checking page is not routed out of event page.
      expect(state.current.name).toBe('event');
      //checking shareOnFb variable defaults to false.
      expect(controller.shareOnFb).toEqual('false');
      //checking addToCalendat variable defaults to false.
      expect(controller.addToCalendar).toEqual('false');
    });
  });
});
