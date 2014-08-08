'use strict'

angular.module('projetobrasilFrontApp')
  .controller('HomepageCtrl', function($rootScope, $scope, $http, $log) {

    $http.get($rootScope.apiBaseUrl+'politicians').
      success(function(data, status, headers, config) {
        $scope.politicos = data;
      }).
      error(function(data, status, headers, config) {
        $log.error(status);
      });

  });
