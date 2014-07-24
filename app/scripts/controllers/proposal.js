'use strict';

angular.module('projetobrasilFrontApp').controller('ProposalCtrl', ['$scope', 'Proposal', 'Rating', function ($scope, Proposal, Rating) {

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

    $scope.proposal = Proposal.get({proposalId: '373ba630-0d23-11e4-9a02-8724c6fad213'});
    $scope.cor = $scope.colors[ Math.floor(Math.random()*14) ];

    $scope.rate = 3;
    $scope.max = 5;
    $scope.isReadonly = true;

    Rating.get({ratingId: '373ba630-0d23-11e4-9a02-8724c6fad213'}, function(data) {
      $scope.rating = data;
    });


	}]);
