'use strict';

angular.module('projetobrasilFrontApp')
  .controller('ProfilesCtrl', function ($scope, $state, $stateParams, profileGetter) {
  	var profileId = $stateParams.nomeUrl;

  	$scope.setActiveById = function(nomeUrna) {
  		var profiles = $scope.profiles;

  		for (var i = 0; i < profiles.length; i++) {
  			var p = profiles[i];
  			if(p.nome_url === profileId) {
  				$scope.setActive(p);
  				return;
  			}
  		}
  	};

  	$scope.$watch('profiles', function(profiles) {
  		if(!profiles) return;

  		if(!profileId) {
  			$scope.setActive(profiles[0]);
  		}else {
  			$scope.setActiveById(profileId);
  		}
  	});

  });

