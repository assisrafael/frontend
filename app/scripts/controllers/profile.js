'use strict';

angular.module('projetobrasilFrontApp')
  .controller('ProfilesCtrl', function ($scope, $state, $stateParams, profileGetter) {
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

  	$scope.$watch('profiles', function(profiles) {
  		if(!profiles) return;

  		if(!profileId) {
  			$scope.setActive(profiles[0]);
  		}else {
  			$scope.setActiveById(profileId);
  		}
  	});

    $scope.bens = [
      {'descricao':'Casa', 'valor':'200.000'},
      {'descricao':'Carro', 'valor':'80.050'},
      {'descricao':'Sitio', 'valor':'900.300'},
      {'descricao':'1000 cabeças de gado', 'valor':'700.000'},
      {'descricao':'Fazenda', 'valor':'4.200.000'},
      {'descricao':'Posto de gasolina', 'valor':'100.000'},
      {'descricao':'50 quotas da empreiteira Bonifácio', 'valor':'2.300.000'},
      {'descricao':'Casa de veraneio', 'valor':'1.200.000'},];

    $scope.rate = 3;
    $scope.max = 5;
    $scope.isReadonly = false;

    $scope.hoveringOver = function(value) {
      $scope.overStar = value;
      $scope.percent = 100 * (value / $scope.max);
    };

  });

