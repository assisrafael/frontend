'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $rootScope, proposalsGetter, hotkeys, profileGetter, $filter) {

    $scope.proposals = {};
    var proposalIndex = 0;

    profileGetter.getProfile().then(function(profiles) {
      if(!profiles) return;
      // $scope.userVotes = UserRatings.get();
      // profiles = $filter('orderBy')(profiles, 'nome_urna');
      $scope.profiles = profiles;
      // $scope.$parent.setActiveByName(profileName);

    });

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
          $scope.getNextProposal();
          proposalIndex = 1;
        });
    };

    $scope.getNextProposal = function(){
      $scope.proposal = $scope.proposals[proposalIndex++];
    };


    // $scope.$on('successfulRating', function(){
    //   alert('oi');
    // });



  });
