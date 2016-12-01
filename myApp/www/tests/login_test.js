
describe('LoginCtrl', function() {
  beforeEach(module('starter.services'));
  beforeEach(module('starter.controllers'));
  beforeEach(module('starter.constant'));
  beforeEach(module('stateMock'));

  var $controller;
  var state;
  var LoginService;
  var q;

  beforeEach(inject(function(_$controller_,$state,_LoginService_,$q){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
    state = $state;
    LoginService = _LoginService_;
    q = $q;


    state.expectTransitionTo('event');
  }));

  //Test case username=alice@husky.neu.edu and password=alice.
  //Since username password is correct, on signin the application moves to page 'Event'
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {


      spyOn(LoginService, 'login').and.callFake(function(){
        var deferred = q.defer();
        return deferred.promise;
      });

      var $scope = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:state,rootScope:rootScope,$scope: $scope,LoginService:LoginService });
      controller.signin('alice@husky.neu.edu','alice');

      expect(LoginService.login).toHaveBeenCalledWith('alice@husky.neu.edu','alice');
    });
  });












  // //Test case username=bob@northeastern.neu.edu and password=bob.
  // //Since username password is correct, on signin the application moves to page 'Event'
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('bob@northeastern.neu.edu','bob')
  //     expect(state.current.name).toBe('event');
  //   });
  // });
  // //Test case username=charley@neu.edu and password=charley.
  // //Since username password is correct, on signin the application moves to page 'Event'
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('charley@neu.edu','charley')
  //     expect(state.current.name).toBe('event');
  //   });
  // });
  //
  // //Test case username='' and password=charley. Expecting no login with msg Failure.
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var $state = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('','charley')
  //     expect($scope.msg).toEqual('Failure');
  //   });
  // });
  // //Test case username=charley@neu.edu and password=''. Expecting no login with msg Failure.
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var $state = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('charley@neu.edu','')
  //     expect($scope.msg).toEqual('Failure');
  //   });
  // });
  // //Test case username='' and password=''. Expecting no login with msg Failure.
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var $state = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('','')
  //     expect($scope.msg).toEqual('Failure');
  //   });
  // });
  // //Test case username=nivedita.mittal@gmail.com and password='abc'. Expecting no login with msg Failure.
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var $state = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('nivedita.mittal@gmail.com','abc')
  //     expect($scope.msg).toEqual('Failure');
  //   });
  // });

});

