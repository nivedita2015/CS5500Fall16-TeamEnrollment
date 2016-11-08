
describe('LoginCtrl', function() {
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

  //Test case username=alice@husky.neu.edu and password=alice.
  //Since username password is correct, on signin the application moves to page 'Event'
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.signin('alice@husky.neu.edu','alice');
      expect(state.current.name).toBe('event');
    });
  });
  //Test case username=bob@northeastern.neu.edu and password=bob.
  //Since username password is correct, on signin the application moves to page 'Event'
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.signin('bob@northeastern.neu.edu','bob')
      expect(state.current.name).toBe('event');
    });
  });
  //Test case username=charley@neu.edu and password=charley.
  //Since username password is correct, on signin the application moves to page 'Event'
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
      controller.signin('charley@neu.edu','charley')
      expect(state.current.name).toBe('event');
    });
  });

  //Test case username='' and password=charley. Expecting no login with msg Failure.
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('','charley')
      expect($scope.msg).toEqual('Failure');
    });
  });
  //Test case username=charley@neu.edu and password=''. Expecting no login with msg Failure.
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('charley@neu.edu','')
      expect($scope.msg).toEqual('Failure');
    });
  });
  //Test case username='' and password=''. Expecting no login with msg Failure.
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('','')
      expect($scope.msg).toEqual('Failure');
    });
  });
  //Test case username=nivedita.mittal@gmail.com and password='abc'. Expecting no login with msg Failure.
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('nivedita.mittal@gmail.com','abc')
      expect($scope.msg).toEqual('Failure');
    });
  });

});

