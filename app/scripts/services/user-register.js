'use strict';

angular.module('projetobrasilFrontApp')
.factory('UserRegister', ['$http', '$log', '$cookies', function($http, $log, $cookies){
  return {
    register: function(user, success, error){
      $http.post('http://api.projetobrasil.org:4242/v1/user/register', user)
      .success(function(res, status, headers) {
       success();
      }).error(error);
    }
  };
}])
.factory('UserLogin', ['$http', '$log', '$cookies', function($http, $log, $cookies){
  return {
    login: function(user, success, error){
       $http.post('http://api.projetobrasil.org:4242/v1/user/login', user)
      .success(function(res, status, headers) {
        success(res);
      }).error(error);
    },
    logout: function(success, error){
       $http.get('http://api.projetobrasil.org:4242/v1/user/logout')
       .success(success)
       .error(error);
    },
    isUserLogged: function(success){
     $http.get('http://api.projetobrasil.org:4242/v1/profile')
      .success( function(userData) { $log.info('Sucesso!!!!'); success(userData); } )
      .error( function(){  $log.error('Erro no checkloggedusers!!!!');  return false; } );
    }
  };
}])
.factory('ProposalRating', ['$http', function($http){
  return {
    setRate: function(user, rate, success, error){
      $http.post('http://api.projetobrasil.org:4242/v1/user/login', rate)
      .success(function(res) {
        //changeUser(res);
        success();
      }).error(error);
    }
  };
}]);



// ONDE PAREI: NAO CONSEGUI INJETAR A FACTORY NO CONTROLLER!
