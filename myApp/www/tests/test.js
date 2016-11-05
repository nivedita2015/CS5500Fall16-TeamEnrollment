// describe('Testing Login Ctrl', function(){
//
//   var $controller;
//   beforeEach(function(){
//     module('starter.controllers');
//     inject(function(_$controller_){
//
//       $controller = _$controller_;
//
//
//     });
//
//   });
//
//   // Test (spec)
//   it('should say \'testing\'', function() {
//     var $scope = {};
//     // $controller takes an object containing a reference to the $scope
//     var controller = $controller('LoginCtrl', { $scope: $scope });
//     // the assertion checks the expected result
//     expect($scope.title).toEqual('testing');
//   });
//
// });

// //This is basic assettion test case
// describe("Test Suite", function() {
//   it("test spec", function() {
//     expect( true ).toEqual(true);
//   });
// });


//testing
// describe("LoginCtrl", function(){
//
//   var scope;
//   beforeEach(inject(function ($controller){
//     createController = function() {
//       return $controller('PlaylistCtrl', {
//         '$scope': scope
//       });
//     };
//   }));
//
//   it('should return testing', function() {
//     var controller = createController();
//     // $location.path('/about');
//     // expect($location.path()).toBe('/about');
//     // expect(scope.isActive('/about')).toBe(true);
//     // expect(scope.isActive('/contact')).toBe(false);
//     expect($scope.title).toEqual('testing');
//   });
//
// });


describe('LoginCtrl', function() {
  var scope, $stateParams, createController;

  beforeEach(module('starter.controllers')); //<--- Hook module

  beforeEach(inject(function ($rootScope, $controller) {
    scope = $rootScope.$new();

    createController = function() {
      return $controller('PlaylistCtrl', {
        // $state:$state,
        // $rootScope:$rootScope,
        $scope: scope,
        $stateParams:$stateParams
      });
    };
  }));

  it('should return testing', function() {
    var controller = createController();
    expect(scope.title).toBe('testing');
  });
});
