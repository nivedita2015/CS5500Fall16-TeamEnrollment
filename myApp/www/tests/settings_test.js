describe('SettingsCtrl',function(){
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;

  beforeEach(inject(function(_$controller_,$state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    state.expectTransitionTo('preferences.favorites');
  }));

  //Test case check redirection to Favorites.
  //application moves to page 'Favorites'
  describe('SettingsCtrl', function() {
    it('checks redirection to favorites Page', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('SettingsCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.favoritesPage();
      expect(state.current.name).toBe('preferences.favorites');
    });
  });

});

describe('SettingsCtrl',function(){
  beforeEach(module('starter.controllers'));
  beforeEach(module('stateMock'));
  var $controller;
  var state;
  beforeEach(inject(function(_$controller_,$state){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    state.expectTransitionTo('preferences.events');
  }));

  //Test case check redirection to AllEvents.
  //application moves to page 'AllEvents'
  describe('SettingsCtrl', function() {
    it('checks redirection to AllEvents Page', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('SettingsCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.allEventsPage();
      expect(state.current.name).toBe('preferences.events');
    });
  });

});

describe('SettingsCtrl',function(){
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

  //Test case check redirection to event List page.
  //application moves to page 'event'
  describe('SettingsCtrl', function() {
    it('checks redirection to Event List Page', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('SettingsCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.eventPage();
      expect(state.current.name).toBe('event');
    });
  });



});








