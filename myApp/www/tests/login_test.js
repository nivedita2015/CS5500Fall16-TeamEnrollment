// //Test for login Ctrl
//
// describe('LoginCtrl', function() {
//   var scope,state, createController;
//   beforeEach(module('starter.controllers')); //<--- Hook module
//
//   beforeEach(inject(function ($rootScope, $controller,$state) {
//     scope = $rootScope.$new();
//     state = $state;
//     createController = function () {
//       return $controller('LoginCtrl', {$state:state, $rootScope:$rootScope, $scope:scope});
//     };
//   }));
//
//   //Test case for correct username-password pair
//   it('should move to the event page after successfull sign in', function() {
//     var controller = createController();
//     spyOn($state,'go');
//     controller.signin('alice@husky.neu.edu','alice');
//     expect($state.go).toHaveBeenCalledWith('signin',{emailId:'alice@husky.neu.edu',password:'alice'})
//   });
//
//   // Test case for incorrect username-password pair
//   it('should throw error because username-password pair is incorrect', function() {
//     var controller = createController();
//     controller.signin('alice@husky.neu.edu','bob');
//     expect(controller.login.error).toEqual('No data found in controller');
//     spyOn($state,'go');
//     expect($state.go).toHaveBeenCalledWith('signin',{emailId:'alice@husky.neu.edu',password:'bob'})
//   });
//
//   // Test case for empty username
//   it('should throw error because username is empty', function() {
//     var controller = createController();
//     spyOn($state,'go');
//     expect($state.go).toHaveBeenCalledWith('signin',{emailId:'',password:'abc'})
//   });
//
//   // Test case for empty password
//   it('should throw error because password is empty', function() {
//     var controller = createController();
//     spyOn($state,'go');
//     expect($state.go).toHaveBeenCalledWith('signin',{emailId:'charley@neu.edu',password:''})
//   });
// });


describe('LoginCtrl', function() {
<<<<<<< HEAD
  var scope,$state,$rootScope, $stateParams, createController;
  beforeEach(module('starter.controllers')); //<--- Hook module
  beforeEach(inject(function ($rootScope, $controller,$state) {
    scope = $rootScope.$new();

    createController = function() {
      return $controller('LoginCtrl', {
        // $state:$state,
        // $rootScope:$rootScope,
        $state:$state,
        $rootScope:$rootScope,
        $scope: scope
        // $stateParams:$stateParams
      });
    };
=======
  beforeEach(module('starter.controllers'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
>>>>>>> 70910ac5bcc3182b4fa635c38e82131f9e7d095d
  }));


  //Test case uername=alice@husky.neu.edu and password=bob. Expecting no login with response is failure.
  describe('Login Controller', function() {
    it('checks the value the controller message', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('alice@husky.neu.edu','bob')
      expect(controller.msg).toEqual('Failure');
    });
  });

  //Test case uername is empty and password=bob. Expecting no login with response is failure.
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('','bob')
      expect(controller.msg).toEqual('Failure');
    });
  });

  //Test case uername=alice@husky.neu.edu and passwordis empty. Expecting no login with response is failure.
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('alice@husky.neu.edu','')
      expect(controller.msg).toEqual('Failure');
    });
  });

  //Test case when username=alice@husky.neu.edu and password=alice. Correct combination so response is success.
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('alice@husky.neu.edu','alice')
      expect(controller.msg).toEqual('Success');
    });
  });

  //Test case when username=bob@husky.neu.edu and password=bob. Correct combination so response is success.
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('bob@northeastern.neu.edu','bob')
      expect(controller.msg).toEqual('Success');
    });
  });

  //Test case when username=bob@husky.neu.edu and password=bob. Correct combination so response is success.
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('charley@neu.edu','charly')
      expect(controller.msg).toEqual('Success');
    });
  });

});


