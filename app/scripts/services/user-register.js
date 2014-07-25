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
}])
.factory('UserLogin', ['$http', function($http){
  return {
    login: function(user, success, error){
      $http.post('http://api.projetobrasil.org:4242/v1/user/login', user).success(function(res) {
        //changeUser(res);
        success();
      }).error(error);
    }
  };
}])
.factory('ProposalRating', ['$http', function($http){
  return {
    setRate: function(user, rate, success, error){
      $http.post('http://api.projetobrasil.org:4242/v1/user/login', rate).success(function(res) {
        //changeUser(res);
        success();
      }).error(error);
    }
  };
}]);



// ONDE PAREI: NAO CONSEGUI INJETAR A FACTORY NO CONTROLLER!
