'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProfileCtrl', function ($scope, profileGetter, $filter, proposalsGetter) {
	profileGetter.getProfile().then(function(profiles) {
		$scope.profiles = profiles;
		$scope.setActive(profiles[0]);
	});

	$scope.isActive = function(political) {
		return $scope.currentPolitical === political;
	};

	$scope.setActive = function(political) {
		$scope.currentPolitical = political;
		$scope.$parent.selectedPolitical = political;
	};
});
