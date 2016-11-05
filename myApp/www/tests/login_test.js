describe('LoginCtrl', function() {
  beforeEach(module('starter.controllers'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  //Test case username=alice@husky.neu.edu and password=alice. Expecting login with message Success.
  describe('Login Controller', function() {
    it('checks username and password validation ', function() {

      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      spyOn($state,'go');
      controller.signin('alice@husky.neu.edu','alice');
      expect($state.go).toHaveBeenCalledWith('event');
      // expect($scope.msg).toEqual('Success');
    });
  });

  // //Test case username=bob@northeastern.neu.edu and password=bob. Expecting login with message Success.
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var $state = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('bob@northeastern.neu.edu','bob')
  //     expect(controller.msg).toEqual('Success');
  //   });
  // });
  //
  // //Test case username=charley@neu.edu and password=charley. Expecting login with message Success.
  // describe('Login Controller', function() {
  //   it('checks username and password validation ', function() {
  //     var $scope = {};
  //     var $state = {};
  //     var rootScope = {};
  //     var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
  //     controller.signin('charley@neu.edu','charley')
  //     expect(controller.msg).toEqual('Success');
  //   });
  // });
  //
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

