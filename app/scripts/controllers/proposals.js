'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsCtrl', function ($scope, proposalsGetter) {
	$scope.$watch('selectedPolitical', function(politician) {
		if(!politician) return;

		proposalsGetter.getPoliticianProposals(politician.id).then(function(data) {
			$scope.proposals = data;
		});
	});
});
