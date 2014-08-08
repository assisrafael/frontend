'use strict'

angular.module('projetobrasilFrontApp')
  .controller('HomepageCtrl', function($rootScope, $scope, $http, $log, profileGetter) {

    profileGetter.getProfile().then(function(profiles) {
        if(!profiles) return;
        $scope.politicos = profiles;
      });

  });
