angular.module('starter.services',['starter.constant'])

  // .factory('LoginService', function($q,$http,API_ENDPOINT){
  //
  //   var LoginService = {};
  //
  //   LoginService.login = function(emailId,password){
  //     return http.get(API_ENDPOINT.url+'/users?username='+emailId+'&password='+password);
  //   };
  //
  //
  // })

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
    // }

    // function LoginService($http,API_ENDPOINT){
    //   var loginApi = {
    //     login:login
    //   };
    //   return loginApi;
    //
    //   function login(emailId,password){
    //     alert('inside login service call');
    //     return $http.get(API_ENDPOINT.url+'/users?username='+emailId+'&password='+password);
    //   }
    // }

  .factory('EventService', function($q, $http, API_ENDPOINT) {

    return {
      getEvents:function(userId){
        // alert('inside event service call');
        var deferred = $q.defer();
        $http.get(API_ENDPOINT.url+'/users/events?id='+userId)
          .success(function(response){
            deferred.resolve(response)
          }).error(function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    }
})
  .factory('EventDetailsService', function($q,$http,API_ENDPOINT){

    var EventDetailsService = {};

    EventDetailsService.getEventDetails = function(eventId){
      return http.get(API_ENDPOINT.url+''+eventId);
    };


    return EventDetailsService;
  })
  .factory('LoginService',function($q,$http,API_ENDPOINT){
    return{
      login:function(emailId,password){
        // alert('inside login service call');
        var deferred = $q.defer();
        $http.get(API_ENDPOINT.url+'/users?username='+emailId+'&password='+password)
          .success(function(response){
            // alert(response);
            deferred.resolve(response)
          }).error(function(){
          // alert('fail');
          deferred.reject();
        });
        return deferred.promise;
      }
    }
  });

