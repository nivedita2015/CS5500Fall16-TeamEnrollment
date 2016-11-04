describe('Testing Login Ctrl', function(){

  var $controller;
  beforeEach(function(){
    module('starter.controllers');
    inject(function(_$controller_){

      $controller = _$controller_;


    });

  });

  // Test (spec)
  it('should say \'testing\'', function() {
    var $scope = {};
    // $controller takes an object containing a reference to the $scope
    var controller = $controller('LoginCtrl', { $scope: $scope });
    // the assertion checks the expected result
    expect($scope.title).toEqual('testing');
  });

});
