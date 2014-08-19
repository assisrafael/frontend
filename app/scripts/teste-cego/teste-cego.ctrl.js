'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, proposalsGetter, hotkeys, profileGetter) {

    $scope.proposals = {};
    var progressNumber = 10;
    $scope.progress = progressNumber + '%';

    $scope.$on('rated', function(){
      progressNumber += 10;
      $scope.progress = progressNumber + '%';
      console.log('Opa! Votei! ');
    });

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
      $scope.$$childTail.enableRating();
      $scope.$$childTail.over = 0;
      $scope.proposal = $scope.proposals[proposalIndex++];
      $scope.politicalName = getNomeUrna($scope.profiles, $scope.proposal.politicians_id);
    };

    function getNomeUrna(obj, id) {
      for (var i=0; i<obj.length;i++) {
        console.log('id: ' + obj[i].id + '- id2: ' + id);
        if(obj[i].id == id){
          return obj[i].nome_urna;
        }
      }
    };


    // $scope.$on('successfulRating', function(){
    //   alert('oi');
    // });



  });
