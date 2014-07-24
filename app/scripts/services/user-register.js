'use strict';

angular.module('projetobrasilFrontApp')
.factory('UserRegister', ['$http', function($http){
  return {
    register: function(user, success, error){
      $http.post('http://api.projetobrasil.org:4242/v1/user/register', user).success(function(res) {
        //changeUser(res);
        success();
      }).error(error);
    }
  };
}]);



// ONDE PAREI: NAO CONSEGUI INJETAR A FACTORY NO CONTROLLER!
