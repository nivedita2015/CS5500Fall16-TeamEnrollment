

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

  it('should move to the event page after successfull sign in', function() {
    var controller = createController();
    // expect(scope.title).toBe('testing');
    spyOn($state,'go');
    // signin('bob','bob');
    // expect(signin('bob','bob').to)
    expect($state.go).toHaveBeenCalledWith('signin',{emailId:'bob',password:'bob'})
  });
});
