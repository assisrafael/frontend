'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsCtrl', function ($scope, proposalsGetter) {
	$scope.$watch('selectedPolitical', function(politician) {
		if(!politician) return;

		proposalsGetter.getPoliticianProposals(politician.id).then(function(data) {
			$scope.proposals = data;

      for (var i = data.length - 1; i >= 0; i--) {
        data[i].cor = $scope.colors[ Math.floor(Math.random()*14) ];
      };
		});

  });

  $scope.rate = 0;
  $scope.max = 5;
  $scope.isReadonly = false;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.colors = [
    '#8CD500',
    '#38990C',
    '#17A2DC',
    '#062084',
    '#652D90',
    '#5E3209',
    '#ED1D24',
    '#D91B8B',
    '#F6A41C',
    '#FFD400',
    '#2E281D',
    '#D8D8D8',
    '#959595',
    '#FFABEC',
    '#00FFC7'
  ];

});
