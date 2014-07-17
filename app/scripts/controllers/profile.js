'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProfileCtrl', function ($scope, $state, $stateParams, profileGetter, $filter) {
	var profileId = $stateParams.profileId;

	profileGetter.getProfile().then(function(profiles) {
		profiles = $filter('orderBy')(profiles, 'nome_urna');
		$scope.profiles = profiles;

		if(!profileId) {
			$scope.setActive(profiles[0]);
		}else {
			for (var i = 0; i < profiles.length; i++) {
				var p = profiles[i];
				if(p.id === profileId) {
					$scope.setActive(p);
					break;
				}
			}
		}
	});

	$scope.isActive = function(political) {
		return $scope.currentPolitical === political;
	};

	$scope.setActive = function(political) {
		$scope.currentPolitical = political;
		$scope.$parent.selectedPolitical = political;
		$state.go('profile.view', {
			profileId: political.id
		});
	};
});
