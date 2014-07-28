'use strict';

angular.module('projetobrasilFrontApp')
  .controller('ProfilesCtrl', function ($scope, $state, $stateParams, profileGetter) {
  	var profileName = $stateParams.nameUrl;

  	$scope.setActiveByName = function(nameUrl) {
  		var profiles = $scope.profiles;

  		for (var i = 0; i < profiles.length; i++) {
  			var p = profiles[i];
  			if(p.nome_url === profileName) {
  				$scope.setActive(p);
  				return;
  			}
  		}
  	};

  	$scope.$watch('profiles', function(profiles) {
  		if(!profiles) return;

  		if(!profileName) {
  			$scope.setActive(profiles[0]);
  		}else {
  			$scope.setActiveByName(profileName);
  		}
  	});

  });

