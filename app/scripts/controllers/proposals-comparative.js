'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsComparativeCtrl', ['$scope', 'profileGetter', 'proposalsGetter',
	function($scope, profileGetter, proposalsGetter){
		profileGetter.getProfile().then(function(politicians) {
			$scope.politicians = politicians;
		});

		// proposalsGetter.getAllProposals().then(function(proposals) {
		// 	$scope.proposals = proposals;
		// });

	$scope.proposals = {
		'Educação': {
			'Aécio': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				}
			],
			'Dilma': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				}
			],
			'Eduardo': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				}
			]
		},
		'Saúde': {
			'Aécio': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				}
			],
			'Dilma': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				}
			],
			'Eduardo': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				}
			]
		},
		'Segurança': {
			'Aécio': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				}
			],
			'Dilma': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				}
			],
			'Eduardo': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				}
			]
		},
		'Energia': {
			'Aécio': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				}
			],
			'Dilma': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				}
			],
			'Eduardo': [
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-danger',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-warning',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-info',
				},
				{
					proposal: 'Lorem ipsum dolor sit amet, consectetur adipisicing elit. Laboriosam error officiis id aperiam mollitia, animi accusantium in possimus, fugiat incidunt, ut itaque amet, veritatis harum atque eos tenetur unde doloribus!',
					rating: 'alert-success',
				}
			]
		}
	};
}])
