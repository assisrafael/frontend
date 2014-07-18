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
			// if(!$scope.allProposals) return;

			var proposals = {};
			$scope.allProposals.forEach(function(proposal) {
				var proposalPoliticianId = proposal.politicians_id;
				var politician = findSelectedPoliticianById(proposalPoliticianId);
				if(!politician) return;

				var theme = proposal.tema;
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

	// $scope.proposals = {
	// 	'Educação': {
	// 		'Aécio': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			}
	// 		],
	// 		'Dilma': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			}
	// 		],
	// 		'Eduardo': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			}
	// 		]
	// 	},
	// 	'Saúde': {
	// 		'Aécio': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			}
	// 		],
	// 		'Dilma': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			}
	// 		],
	// 		'Eduardo': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			}
	// 		]
	// 	},
	// 	'Segurança': {
	// 		'Aécio': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			}
	// 		],
	// 		'Dilma': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			}
	// 		],
	// 		'Eduardo': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			}
	// 		]
	// 	},
	// 	'Energia': {
	// 		'Aécio': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			}
	// 		],
	// 		'Dilma': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			}
	// 		],
	// 		'Eduardo': [
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-danger',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-warning',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-info',
	// 			},
	// 			{
	// 				proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
	// 				rating: 'alert-success',
	// 			}
	// 		]
	// 	}
	// };
}])
