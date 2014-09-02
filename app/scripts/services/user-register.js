'use strict';

angular.module('projetobrasilFrontApp')
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
    promise: function(){
      return promise;
    },
    register: function(user, success, error){
      $http.post($rootScope.apiBaseUrl + 'user/register', user)
      .success(function(data, status, headers) {
        isUserLogged = true;
        loggedUserData = data.user;
        $rootScope.$broadcast('login');
        success();
        ga('send', 'event', 'form', 'register');
      }).error(error);
    },
    facebookLogin: function(modalDismiss){
      var left = (screen.width/2)-(780/2);
      var top = (screen.height/2)-(410/2);
      var signinWin = window.open($rootScope.apiBaseUrl + "auth/facebook", "SignIn", "width=780,height=410,toolbar=0,scrollbars=0,status=0,resizable=0,location=0,menuBar=0,left=" + left + ",top=" + top);
      signinWin.focus();
      var timer = setInterval(function() {
        if(signinWin.closed) {
            clearInterval(timer);

            //Todo: Descobrir o motivo de ser chamado duas vezes aqui!

            promise = $http.get($rootScope.apiBaseUrl + 'profile')
            .success(function(data) {
              if(!isUserLogged){
                isUserLogged = true;
                loggedUserData = data;
                $rootScope.$broadcast('login');
                if(modalDismiss){
                  modalDismiss();
                }
              }
            }).error(function(){
              // console.log('Deu errado');
            });
        }
      }, 1000);
    // // });
    },
    login: function(user, success, error){
       $http.post($rootScope.apiBaseUrl+'user/login', user)
      .success(function(data, status, headers) {
        isUserLogged = true;
        loggedUserData = data.user;
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
