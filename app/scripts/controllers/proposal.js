'use strict';

angular.module('projetobrasilFrontApp').controller('ProposalCtrl', ['$scope', '$state', '$stateParams', 'Proposal', 'Rating', function ($scope, $state, $stateParams, Proposal, Rating) {

    var proposalId = $stateParams.proposalId;

    if(proposalId){

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

      $scope.proposal = Proposal.get({proposalId: proposalId});
      $scope.cor = $scope.colors[ Math.floor(Math.random()*14) ];

      $scope.rate = 3;
      $scope.max = 5;
      $scope.isReadonly = true;

      Rating.get({ratingId: proposalId}, function(data) {
        $scope.rating = data;
      });

    }else{

      $state.go('profile', {
        nameUrl: $stateParams.nameUrl
      })

    }

	}]);
