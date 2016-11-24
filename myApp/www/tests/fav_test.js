
describe('FavCtrl', function() {
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;
  // var timeout;

  beforeEach(inject(function(_$controller_,$state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    state.expectTransitionTo('preferences.favorites');
  }));


  describe('Favorites Controller1', function() {
    it('checks event is spliced out of favorites successfully ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:$state,rootScope:rootScope,$scope: $scope});
      controller.alterFavourite('123');
      // expect(state.current.name).toBe('preferences.favorites');
      expect($scope.msg1).toEqual('true');
    });
  });


  describe('Favorites Controller2', function() {
    it('checks event is spliced out of favorites successfully ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:$state,rootScope:rootScope,$scope: $scope});
      controller.alterFavourite('345');
      // expect(state.current.name).toBe('preferences.favorites');
      expect($scope.msg1).toEqual('true');
    });
  });

  describe('Favorites Controller3', function() {
    it('checks event is spliced out of favorites successfully ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:$state,rootScope:rootScope,$scope: $scope});
      controller.alterFavourite('234');
      // expect(state.current.name).toBe('preferences.favorites');
      expect($scope.msg1).toEqual('false');
    });
  });

  describe('Favorites Controller4', function() {
    it('checks event is spliced out of favorites successfully ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:$state,rootScope:rootScope,$scope: $scope});
      controller.alterFavourite('789');
      // expect(state.current.name).toBe('preferences.favorites');
      expect($scope.msg).toEqual('Failure');
    });
  });

});

