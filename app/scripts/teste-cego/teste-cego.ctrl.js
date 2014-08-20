'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, $timeout, proposalsGetter, hotkeys, profileGetter) {

    $scope.proposals = {};
    var progressNumber = 10;
    $scope.progress = progressNumber + '%';
    $scope.automaticfoward = true;

    $scope.$on('rated', function(){
      progressNumber += 10;
      $scope.progress = progressNumber + '%';
      if($scope.automaticfoward){
        $timeout($scope.getNextProposal, 3000);
      }
    });

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
