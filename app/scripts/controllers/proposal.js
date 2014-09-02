'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalCtrl', ['$scope', '$state', '$location', '$stateParams', 'proposalsGetter', 'graphRating', 'categoryColorGetter', 'UserRatings', function ($scope, $state, $location, $stateParams, proposalsGetter, graphRating, categoryColorGetter, UserRatings) {

    $scope.isReadonly = true;

    $scope.id = $scope.$parent.proposalId;

    $scope.url = $location.absUrl();

    if(typeof($scope.notifyUrl) === 'undefined'){
      $scope.notifyUrl = $scope.apiBaseUrl + 'rating';
    }

    $scope.coresPizza = {
          '1' : '#7EC5AC',
          '2' : '#4DA485',
          '3' : '#308D6C',
          '4' : '#1A7957',
          '5' : '#086041'
        };

    $scope.$watch('selectedPolitical', function(politician){
      if(!politician) return;

      proposalsGetter.getProposal($scope.$parent.proposalId).then(function(data){
        $scope.userVotes = UserRatings.get();

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
        var total = 0;

        for (var i = data.notas.length - 1; i >= 0; i--) {
          total += data.notas[i].valor;
        };

        for (var i = data.notas.length - 1; i >= 0; i--) {
          data.notas[i].porcentagem = (data.notas[i].valor*100 / total).toFixed(2);
          data.notas[i].label = parseInt(data.notas[i].label);
        };

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

	}])
;
