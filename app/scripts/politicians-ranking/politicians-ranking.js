'use strict'

angular.module('projetobrasilFrontApp')
  .controller('PoliticiansRankingCtrl', ['$scope', 'UserRatings', 'profileGetter', function($scope, UserRatings, profileGetter){

    $scope.position = 0;

    profileGetter.getProfile().then(function(profiles) {
        if(!profiles) return;
        $scope.politicians = profiles;
      });

  }]);
