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

    var login = function(emailId,password) {
      return $q(function(resolve, reject) {
        $http.get(API_ENDPOINT.url+'/users?username='+emailId+'&password='+password).then(function(result) {
          console.log(result.data);
          if (result.data != 'False') {
            $http.get(API_ENDPOINT.url+'/users/events?id='+result.data).then(function(events) {
          console.log(events.data);
        });
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
