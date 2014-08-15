'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $rootScope, proposalsGetter, hotkeys) {

    //$scope.notifyUrl = 'Augusto';
    $scope.proposals = {};

    hotkeys.bindTo($scope)
    .add({
      combo: '1',
      description: 'Vota 1',
      callback: function(){
        $rootScope.$broadcast('rate', 1);
      }
    })

    $scope.getSomeRandomProposals = function(){
      proposalsGetter.getRandomProposals(150).then(
        function(proposalsList){
          $scope.proposals = proposalsList;
          $scope.getNextProposal();1
        });
    };

    var proposalIndex = 0;

    $scope.getNextProposal = function(){
      $scope.proposal = $scope.proposals[proposalIndex++];
    }

    $scope.$watch($scope.userVotes, function(){
      alert('oi');
    });

    // $scope.$on('successfulRating', function(){
    //   alert('oi');
    // });



  });
