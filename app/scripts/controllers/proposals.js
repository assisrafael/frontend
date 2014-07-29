'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsCtrl', function ($scope, $stateParams, proposalsGetter, categoryColorGetter, $log) {

	$scope.$watch('selectedPolitical', function(politician) {
		if(!politician) return;

		proposalsGetter.getPoliticianProposals(politician.id).then(function(data) {
			$scope.proposals = data;

      for (var i = 0; i < data.length; i++) {
        $scope.proposals[i].cor = categoryColorGetter.getColorTheme($scope.proposals[i].tema);
      };
		});

  });

})
.controller('ProposalVotingCtrl', function($scope, $log, Rating){
  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;
  $scope.userVote = 2;
    $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.$watch('rate', function(newVal, oldVal, scope){
    $log.info('Mudou!' + scope.proposal.id + " De " + oldVal + ' para ' + newVal);
    scope.userVote = newVal;
  });
});
