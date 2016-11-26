angular.module('starter')

  .service('LoginService', function($q, $http, API_ENDPOINT) {

    // var register = function(user) {
    //   return $q(function(resolve, reject) {
    //     $http.post(API_ENDPOINT.url + '/signup', user).then(function(result) {
    //       if (result.data.success) {
    //         resolve(result.data.msg);
    //       } else {
    //         reject(result.data.msg);
    //       }
    //     });
    //   });
    // };

    var login = function(user) {
      return $q(function(resolve, reject) {
        $http.post(API_ENDPOINT.url + '/users', user).then(function(result) {
          if (result.data.success) {
            alert('login hurray');
            resolve(result.data.msg);
          } else {
            reject(result.data.msg);
          }
        });
      });
    };

    return {
      login: login
    };
  });
