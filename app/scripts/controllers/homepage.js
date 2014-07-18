'use strict'

angular.module('projetobrasilFrontApp')
  .controller('HomepageCtrl', function($scope, $http) {

    $http.get('http://api.projetobrasil.org:4242/v1/politicians').
      success(function(data, status, headers, config) {
        $scope.politicos = data;
      }).
      error(function(data, status, headers, config) {
        alert(status);
      });

  });
