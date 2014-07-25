'use strict';

angular.module('projetobrasilFrontApp').controller('ProposalCtrl', ['$scope', '$state', '$stateParams', 'proposalsGetter', 'Rating', 'categoryColorGetter', function ($scope, $state, $stateParams, proposalsGetter, Rating, categoryColorGetter) {

    var proposalId = $stateParams.proposalId;

    if(proposalId){

      proposalsGetter.getProposal(proposalId).then(function(data){
        $scope.proposal = data;

        $scope.proposal.cor = categoryColorGetter.getColorTheme($scope.proposal.tema);
      });

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
