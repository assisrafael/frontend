'use strict';

angular.module('projetobrasilFrontApp')
.factory('UserRegister', ['$http', '$log', '$cookies', function($http, $log, $cookies){
  return {
    register: function(user, success, error){
      $http.post('http://api.projetobrasil.org:4242/v1/user/register', user)
      .success(function(res, status, headers) {

        $log.info(headers('Set-Cookie'));
        $log.info($cookies.session);
        //changeUser(res);
        success();
      }).error(error);
    }
  };
}])
.factory('UserLogin', ['$http', '$log', function($http, $log){
  return {
    login: function(user, success, error){
       $http.post('http://api.projetobrasil.org:4242/v1/user/login', user)
      .success(function(res, status, headers) {
        $log.info(headers('Set-Cookie'));

        //changeUser(res);
        success(res);
      }).error(error);
    },
    logout: function(){
       $http.get('http://api.projetobrasil.org:4242/v1/user/logout')
       .success(function(){
        return true;
      })
      .error(function(){
        return false;
      });
    },
    isUserLogged: function(){
     $http.get('http://api.projetobrasil.org:4242/v1/profile')
      .success( function(userData) { $log.info('Sucesso!!!!'); return userData; } )
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
