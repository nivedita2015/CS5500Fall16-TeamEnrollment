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

  //Test case event = 234
  //Since event id is correct, the user is transferred to event details page for that event.
  describe('Event Controller', function() {
    it('checks if navigated to event details page ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventClick('234');
      expect(state.current.name).toBe('eventDetails');
    });
  });

  //Test case event id = 555
  //Since event id is incorrect, failure message is returned and controller stays in event state.
  describe('Event Controller', function(){
    it('checks no navigation to event details page since event details id is wrong', function(){
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventClick('555');
      expect($scope.msg).toEqual('Failure');

    });
  });

  //Test case event id = ' '
  //Since event id is null, failure message is returned and controller stays in event state.
  describe('Event Controller', function(){
    it('checks no navigation to event details page since event details id is wrong', function(){
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventClick('');
      expect($scope.msg).toEqual('Failure');
    });
  });

  describe('Event Controller', function(){
    it('seach event true case', function(){
      var $scope = {};
      var rootScope = {};
      var controller = $controller('EventCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.showFilterBar('NU');
      var event1=[
        {
          pic:"/img/NUlogo.png",
          name:"NU Homecoming",
          group:"Association for Student Welfare",
          id:"123",
          dt:"11/09/2016"

        }
      ]
      expect($scope.array1).toEqual(event1);
    });
  });


});
