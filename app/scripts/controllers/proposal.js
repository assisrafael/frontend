'use strict';

angular.module('projetobrasilFrontApp').controller('ProposalCtrl', ['$scope', 'Proposal', 'Rating', function ($scope, Proposal, Rating) {
    $scope.proposal = Proposal.get({proposalId: '373ba630-0d23-11e4-9a02-8724c6fad213'});

    Rating.get({ratingId: '373ba630-0d23-11e4-9a02-8724c6fad213'}, function(data) {
			$scope.rating = data;
    });

	}]);