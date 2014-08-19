'use strict'

angular.module('projetobrasilFrontApp')
  .controller('PoliticiansRankingCtrl', ['$scope', 'UserRatings', 'profileGetter', function($scope, UserRatings, profileGetter){

    $scope.position = 0;

    profileGetter.getProfile().then(function(profiles) {
        if(!profiles) return;
        $scope.politicians = profiles;
      });

  }])
  .directive('politiciansRanking', [function(){
    function link(scope, element, attrs){}

    return {
      restrict: 'E',
      templateUrl: 'views/politicians-ranking.html',
      controller: 'PoliticiansRankingCtrl',
      link: link
    }
  }]);
