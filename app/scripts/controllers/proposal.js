'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalCtrl', ['$scope', '$state', '$location', '$stateParams', 'proposalsGetter', 'Rating', 'categoryColorGetter', function ($scope, $state, $location, $stateParams, proposalsGetter, Rating, categoryColorGetter) {

    $scope.rate = 3;
    $scope.max = 5;
    $scope.isReadonly = true;

    $scope.id = $scope.$parent.proposalId;
    $scope.url = $location.absUrl();

    $scope.$watch('selectedPolitical', function(politician){
      if(!politician) return;

      proposalsGetter.getProposal($scope.$parent.proposalId).then(function(data){

        if($scope.$parent.selectedPolitical.id == data.politicians_id){
          $scope.proposal = data;
          $scope.proposal.cor = categoryColorGetter.getColorTheme($scope.proposal.tema);
        }else{
          $state.go('profile', {
            nameUrl: $stateParams.nameUrl
          })
        }

      });
    });

	}]);
