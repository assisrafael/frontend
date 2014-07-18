'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProfileCtrl', function ($scope, $state, $stateParams, profileGetter, $filter) {
	var profileId = $stateParams.profileId;

  $scope.historico = [
    {'data':'2004', 'descricao':'Eleito deputado estadual'},
    {'data':'2006', 'descricao':'Eleito senador'},
    {'data':'2010', 'descricao':'Re-eleito senador'},];

  $scope.bens = [
    {'descricao':'Casa', 'valor':'200.000'},
    {'descricao':'Carro', 'valor':'80.050'},
    {'descricao':'Sitio', 'valor':'900.300'},
    {'descricao':'1000 cabeças de gado', 'valor':'700.000'},
    {'descricao':'Fazenda', 'valor':'4.200.000'},
    {'descricao':'Posto de gasolina', 'valor':'100.000'},
    {'descricao':'50 quotas da empreiteira Bonifácio', 'valor':'2.300.000'},
    {'descricao':'Casa de veraneio', 'valor':'1.200.000'},];

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

  $scope.randInt = function(){
    return Math.floor(Math.random() * (max - min)) + min;
  };

  $scope.rate = 3;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  //Readmore

  $scope.readMore = false;

  $scope.$watch('readMore', function(){
      $scope.readMoreText = $scope.readMore ? "Ver menos itens" : "Ver mais itens";
      $scope.readMoreHeight = $scope.readMore ? '' : '100px'
  });

  //End Readmore


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
