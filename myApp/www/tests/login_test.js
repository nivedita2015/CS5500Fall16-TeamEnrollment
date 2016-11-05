//Test for login Ctrl

describe('LoginCtrl', function() {
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
  }));

  //Test case for correct username-password pair
  it('should move to the event page after successfull sign in', function() {
    var controller = createController();
    spyOn($state,'go');
    expect($state.go).toHaveBeenCalledWith('signin',{emailId:'alice@husky.neu.edu',password:'alice'})
  });

  //Test case for incorrect username-password pair
  it('should throw error because username-password pair is incorrect', function() {
    var controller = createController();
    spyOn($state,'go');
    expect($state.go).toHaveBeenCalledWith('signin',{emailId:'bob',password:'bob'})
  });

  //Test case for empty username
  it('should throw error because username is empty', function() {
    var controller = createController();
    spyOn($state,'go');
    expect($state.go).toHaveBeenCalledWith('signin',{emailId:'',password:'abc'})
  });

  //Test case for empty password
  it('should throw error because password is empty', function() {
    var controller = createController();
    spyOn($state,'go');
    expect($state.go).toHaveBeenCalledWith('signin',{emailId:'charley@neu.edu',password:''})
  });

});
