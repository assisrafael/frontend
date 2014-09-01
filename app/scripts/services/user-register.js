'use strict';

angular.module('projetobrasilFrontApp')
.factory('UserRegister', ['$rootScope', '$http', '$log', '$cookies', function($rootScope, $http, $log, $cookies){
  return {
    register: function(user, success, error){
      $http.post($rootScope.apiBaseUrl+'user/register', user)
      .success(function(data, status, headers) {
         success();
         ga('send', 'event', 'form', 'register');
      }).error(error);
    }
  };
}])
.factory('UserLogin', ['$rootScope', '$http', '$log', '$cookies', function($rootScope, $http, $log, $cookies){

  var isUserLogged = false;
  var loggedUserData = {};

  var promise = $http.get($rootScope.apiBaseUrl + 'profile')
    .success(function(data) {
      isUserLogged = true;
      loggedUserData = data;
      // success(userData);
    }).error(function(){
      console.log('Deu errado');
    });

  return {
    promise: promise,
    login: function(user, success, error){
       $http.post($rootScope.apiBaseUrl+'user/login', user)
      .success(function(data, status, headers) {
        isUserLogged = true;
        loggedUserData = data;
        $rootScope.$broadcast('login');
        success(data);
      }).error(error);
    },
    logout: function(success, error){
       $http.get($rootScope.apiBaseUrl+'user/logout')
       .success(function(data, status, headers){
          isUserLogged = false;
          loggedUserData = {};
          $rootScope.$broadcast('logout');
          success(data);
        })
       .error(error);
    },
    isUserLogged: function(){
      return isUserLogged;
    },
    getUserData: function(){
      if(isUserLogged){
        return loggedUserData;
      } else {
        return false;
      }
    }
  };
}])
.factory('ProposalRating', ['$rootScope', '$http', function($rootScope, $http){
  return {
    setRate: function(user, rate, success, error){
      $http.post($rootScope.apiBaseUrl+'user/login', rate)
      .success(function(data) {
        //changeUser(data);
        success();
      }).error(error);
    }
  };
}]);



// ONDE PAREI: NAO CONSEGUI INJETAR A FACTORY NO CONTROLLER!
