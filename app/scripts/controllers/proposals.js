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
.controller('ProposalVotingCtrl', function($scope, $log, Rating, $http){

  $scope.rate = Rating.get({ratingId: $scope.proposal.id});

  $scope.max = 5;
  $scope.isReadonly = false;
  $scope.userVote = 2;
  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.saveRate = function(newVal) {
    $log.info('oi');
  }

  $scope.$watch('rate.nota', function(newVal, oldVal, scope){
    $log.info('Mudou!' + scope.proposal.id + " De " + oldVal + ' para ' + newVal);
   // $scope.saveRate(scope.proposal.id, newVal);
    if(!(typeof newVal === 'undefined') && newVal > 0){
      $http.post('http://api.projetobrasil.org:4242/v1/rating/' + scope.proposal.id, {nota: newVal});
    }
    // Rating.post({ratingId: scope.proposal.id, nota: newVal});
    //scope.userVote = newVal;
  });
});
