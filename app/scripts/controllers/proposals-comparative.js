'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsComparativeCtrl', ['$scope', '$document', '$timeout', '$anchorScroll', 'profileGetter', 'proposalsGetter', 'categoryColorGetter', 'UserRatings',
	function($scope, $document, $timeout ,$anchorScroll, profileGetter, proposalsGetter, categoryColorGetter, UserRatings){
		profileGetter.getProfile().then(function(politicians) {
			$scope.politicians = politicians;
			$scope.selectedPoliticians = [];
		});

        proposalsGetter.getAllProposals().then(function(proposals) {
      $scope.allProposals = proposals;

      for (var i = 0; i < proposals.length; i++) {
        $scope.allProposals[i].cor = categoryColorGetter.getColorTheme($scope.allProposals[i].tema);
        // $scope.proposals[i].cor = categoryColorGetter.getColorTheme($scope.proposals[i].tema);
      };

      buildProposals();
    });

		$scope.isSelected = function(politician) {
			return politician.isSelected;
		};

    $scope.disableSelector = function(){
      return $scope.selectedPoliticians.length >= 3;
    }

		$scope.toggleIsSelected = function(politician) {
      if($scope.selectedPoliticians.length < 3 || politician.isSelected){
  			politician.isSelected = !politician.isSelected;

        $scope.selectedPoliticians = $scope.politicians.filter(function(p) {
          return p.isSelected;
        });

  			buildProposals();
      }else{

        toastr.options = {
          "closeButton": true,
          "showMethod": 'slideDown',
          "hideMethod": 'slideUp'
        };
        toastr.warning('Você pode comparar no máximo 3 candidatos!');
      }
		};

		$scope.hash = function(s) {
			return s.toLowerCase().replace(/\s+/g, '');
		};

    $scope.scrollTo = function(hash){
      $timeout(function(){
        var elm = angular.element($('[data-target="#'+hash+'"]')[0]);
        $document.scrollTo(elm, 55, 1000);
      }, 400);
    }

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
			if(typeof($scope.allProposals) === 'undefined') return;

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



        $scope.userVotes = {};

  $scope.$on('login', function(){
    $scope.userVotes = UserRatings.get();
  });
  $scope.$on('logout', function(){
    $scope.userVotes = {};
  });
}]);
