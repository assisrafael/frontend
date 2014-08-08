'use strict'

angular.module('projetobrasilFrontApp')
  .controller('HomepageCtrl', function($scope, $http, $log) {

    $http.get('http://api.projetobrasil.org:4242/v1/politicians').
      success(function(data, status, headers, config) {
        $scope.politicos = data;
        $scope.htmlReady();
      }).
      error(function(data, status, headers, config) {
        $log.error(status);
      });

  });
