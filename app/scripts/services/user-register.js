'use strict';

angular.module('projetobrasilFrontApp')
.factory('UserRegister', ['$rootScope', '$http', '$log', '$cookies', function($rootScope, $http, $log, $cookies){
  return {
    register: function(user, success, error){
      $http.post($rootScope.apiBaseUrl+'user/register', user)
      .success(function(res, status, headers) {
       success();
       ga('send', 'event', 'form', 'register');
      }).error(error);
    }
  };
}])
.factory('UserLogin', ['$rootScope', '$http', '$log', '$cookies', function($rootScope, $http, $log, $cookies){
  return {
    login: function(user, success, error){
       $http.post($rootScope.apiBaseUrl+'user/login', user)
      .success(function(res, status, headers) {
        success(res);
      }).error(error);
    },
    logout: function(success, error){
       $http.get($rootScope.apiBaseUrl+'user/logout')
       .success(success)
       .error(error);
    },
    isUserLogged: function(success){
     $http.get($rootScope.apiBaseUrl+'profile')
      .success( function(userData) { success(userData); } )
      .error( function(){ return false; } );
    }
  };
}])
.factory('ProposalRating', ['$rootScope', '$http', function($rootScope, $http){
  return {
    setRate: function(user, rate, success, error){
      $http.post($rootScope.apiBaseUrl+'user/login', rate)
      .success(function(res) {
        //changeUser(res);
        success();
      }).error(error);
    }
  };
}]);



// ONDE PAREI: NAO CONSEGUI INJETAR A FACTORY NO CONTROLLER!
