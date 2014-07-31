'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalCtrl', ['$scope', '$state', '$location', '$stateParams', 'proposalsGetter', 'graphRating', 'categoryColorGetter', 'UserRatings', function ($scope, $state, $location, $stateParams, proposalsGetter, graphRating, categoryColorGetter, UserRatings) {

    $scope.isReadonly = true;

    $scope.id = $scope.$parent.proposalId;

    $scope.proposal = $scope.$parent.proposal;
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

      graphRating.get({ratingId: $scope.$parent.proposalId}, function(data) {
        $scope.rating = data;
      });
    });


        $scope.userVotes = {};

  $scope.$on('login', function(){
    $scope.userVotes = UserRatings.get();
  });
  $scope.$on('logout', function(){
    $scope.userVotes = {};
  });

	}]);
