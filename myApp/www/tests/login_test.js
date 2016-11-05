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
  beforeEach(module('starter.controllers'));

  var $controller;

  beforeEach(inject(function(_$controller_){
    // The injector unwraps the underscores (_) from around the parameter names when matching
    $controller = _$controller_;
  }));


  //Test case uername=alice@husky.neu.edu and password=bob. Expecting no login with response is failed..
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('alice@husky.neu.edu','bob')
      expect(controller.error).toEqual('No data found in controller');
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
      expect(controller.error).toEqual('No data found in controller');
    });
  });

  //Test case when username=alice@husky.neu.edu and password=alice. Correct combination so response is success.
  describe('Login Controller', function() {
    it('checks the value login.error', function() {
      var $scope = {};
      var $state = {};
      var rootScope = {};
      var controller = $controller('LoginCtrl', {$state:$state,rootScope:rootScope,$scope: $scope });
      controller.signin('bob@northeastern.neu.edu','bob')
      expect(controller.error).toEqual('No data found in controller');
    });
  });


});


