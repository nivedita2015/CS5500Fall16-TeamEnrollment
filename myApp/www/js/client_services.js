angular.module('starter.services',['starter.constant'])

  .factory('LoginService', function($q, $http, API_ENDPOINT) {

    // var login = function(emailId,password) {
    //   return $q(function(resolve, reject) {
    //     $http.get(API_ENDPOINT.url+'/users?username='+emailId+'&password='+password).then(function(result) {
    //       console.log(result.data);
    //       if (result.data != 'False') {
    //         $http.get(API_ENDPOINT.url+'/users/events?id='+result.data).then(function(events) {
    //       console.log("The response is "+events.data);
    //     });
    //         resolve(result.data);
    //       } else {
    //         reject(result.data);
    //       }
    //     });
    //   });
    // };

    var LoginService = {};

    LoginService.login = function(emailId,password){
      return $http.get(API_ENDPOINT.url+'/users?username='+emailId+'&password='+password);
    };

    return LoginService;
  })
  .factory('EventService', function($q, $http, API_ENDPOINT) {

    var EventService = {};

    EventService.getEvents = function(userId){
      return http.get(API_ENDPOINT.url+'/users/events?id='+userId);
    }

    return EventService;

});

