
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
      var scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,$rootScope:rootScope,$scope: scope});
      controller.alterFavourite('123');
      expect(state.current.name).toBe('preferences.favorites');
    });
  });


  describe('Favorites Controller2', function() {
    it('checks event is spliced out of favorites successfully ', function() {
      var scope = {};
      var rootScope = {};
      var controller = $controller('FavCtrl', {$state:state,$rootScope:rootScope,$scope: scope});
      controller.alterFavourite('345');
      expect(state.current.name).toBe('preferences.favorites');
    });
  });

});

