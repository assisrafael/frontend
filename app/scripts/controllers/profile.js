'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProfilesCtrl', function ($scope, $state, $stateParams, profileGetter, $filter) {
	var profileId = $stateParams.profileId;

	$scope.setActiveById = function(profileId) {
		var profiles = $scope.profiles;

		for (var i = 0; i < profiles.length; i++) {
			var p = profiles[i];
			if(p.id === profileId) {
				$scope.setActive(p);
				return;
			}
		}
	};

	profileGetter.getProfile().then(function(profiles) {
		profiles = $filter('orderBy')(profiles, 'nome_urna');
		$scope.$parent.profiles = profiles;

		if(!profileId) {
			$scope.setActive(profiles[0]);
		}else {
			$scope.setActiveById(profileId);
		}
	});

	$scope.$parent.isActive = function(political) {
		return $scope.currentPolitical === political;
	};

	$scope.$parent.setActive = function(political) {
		$scope.currentPolitical = political;
		$scope.$parent.selectedPolitical = political;
		$state.go('profile', {
			profileId: political.id
		});
	};
});
