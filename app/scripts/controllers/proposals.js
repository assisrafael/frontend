'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsCtrl', function ($scope, proposalsGetter) {
	$scope.$watch('selectedPolitical', function(political) {
		if(!political) return;

		proposalsGetter.getProposals(political.id).then(function(data) {
			$scope.proposals = data;
		});
	});
});
