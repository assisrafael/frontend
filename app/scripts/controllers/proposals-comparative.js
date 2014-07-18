'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsComparativeCtrl', ['$scope', 'profileGetter', 'proposalsGetter',
	function($scope, profileGetter, proposalsGetter){
		profileGetter.getProfile().then(function(politicians) {
			$scope.politicians = politicians;
			$scope.selectedPoliticians = [];
		});

		$scope.isSelected = function(politician) {
			return politician.isSelected;
		};

		$scope.toggleIsSelected = function(politician) {
			politician.isSelected = !politician.isSelected;

			$scope.selectedPoliticians = $scope.politicians.filter(function(p) {
				return p.isSelected;
			});

			buildProposals();
		};

		$scope.hash = function(s) {
			return s.toLowerCase().replace(/\s+/g, '');
		};

		function findSelectedPoliticianById (politicianId) {
			if(!$scope.selectedPoliticians) return;

			var proposalPolitician;

			$scope.selectedPoliticians.some(function(politician) {
				if(politician.id === politicianId) {
					proposalPolitician = politician;
					return true;
				}
			});

			return proposalPolitician;
		}

		function buildProposals() {
			// if($scope.selectedPoliticians.length < 2) return;
			// if(!$scope.allProposals) return;

			var proposals = {};
			$scope.allProposals.forEach(function(proposal) {
				var proposalPoliticianId = proposal.politicians_id;
				var politician = findSelectedPoliticianById(proposalPoliticianId);
				if(!politician) return;

				var theme = proposal.tema;
				if(!theme) return;
				proposals[theme] = proposals[theme] || {};
				var proposalTheme = proposals[theme];

				proposalTheme[proposalPoliticianId] = proposalTheme[proposalPoliticianId] || {
					politician: politician,
					proposals: []
				};

				proposalTheme[proposalPoliticianId].proposals.push(proposal);
			});
			$scope.proposals = proposals;
		}

		proposalsGetter.getAllProposals().then(function(proposals) {
			$scope.allProposals = proposals;
			buildProposals();
		});
}]);
