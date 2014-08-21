'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, $timeout, proposalsGetter, hotkeys, profileGetter, testeCego) {

    $scope.proposals = {};
    $scope.automaticfoward = true;
    $scope.showRanking = false;
    $scope.progressSize = 0;
    $scope.progressCount = 0;
    $scope.votinglevel = 20;

    function updateProgress(count){
      if(count >= $scope.votinglevel){
        $scope.showRanking = true;
      } else {
        $scope.progressCount = count;
        $scope.progressSize = 100*$scope.progressCount/$scope.votinglevel + '%';
      }
    };

    testeCego.propostasAvaliadas.query(function(propostas){
      updateProgress(propostas.length);
    });


    $scope.$on('rated', function(ev, count){
      updateProgress(count);
      if($scope.automaticfoward){
        $timeout($scope.getNextProposal, 3000);
      }
    });

    $scope.$watch('$scope.progressCount')

    var proposalIndex = 0;

    profileGetter.getProfile().then(function(profiles) {
      if(!profiles) return;
      $scope.profiles = profiles;
    });

    hotkeys.bindTo($scope)
    .add({
      combo: '1',
      description: 'Vota 1',
      callback: function(){
        $rootScope.$broadcast('rate', 1);
      }
    });

    $scope.getSomeRandomProposals = function(){
      proposalsGetter.getRandomProposals(150).then(
        function(proposalsList){
          $scope.proposals = proposalsList;
          $scope.getNextProposal();
          proposalIndex = 1;
        });
    };

    $scope.getNextProposal = function(){
      $scope.$broadcast('newproposalblindtest');
      $scope.proposal = $scope.proposals[proposalIndex++];
      $scope.politicalName = getNomeUrna($scope.profiles, $scope.proposal.politicians_id);
      $scope.showRatingInfo = false;
    };

    function getNomeUrna(obj, id) {
      for (var i=0; i<obj.length;i++) {
        if(obj[i].id == id){
          return obj[i].nome_urna;
        }
      }
    };
  });
