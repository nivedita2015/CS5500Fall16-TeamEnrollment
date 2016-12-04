angular.module('starter.services',['starter.constant'])
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
  })
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
    return{
      getEventDetails:function(id){
        var deferred = $q.defer();
        $http.get(API_ENDPOINT.url+'/events/?id='+id)
        .success(function(response){
          deferred.resolve(response)
        }).error(function(){
          deferred.reject();
        });
        return deferred.promise;
      }
    }
  })
  ;

