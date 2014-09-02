'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, $timeout, proposalsGetter, hotkeys, profileGetter, testeCego, Angularytics) {

    $scope.proposals = {};
    $scope.automaticfoward = true;
    $scope.showRanking = false;
    $scope.progressSize = 0;
    $scope.votinglevel = 20;
    $scope.votingCount = 0;

    testeCego.propostasAvaliadas.query(function(propostas){
      $scope.votingCount = propostas.length;
      updateProgress();
    });

    $scope.proposalAuthor = {};
    setDefaultAuthor();

    $scope.$on('rated', function(){
      Angularytics.trackEvent("Teste cego", "voto cego", '' , $scope.votingCount);
      $scope.votingCount++;
      updateProgress();
      if($scope.automaticfoward){
        $timeout($scope.getNextProposal, 1500);
      }
    });

    $scope.$on('login', function(){
      testeCego.propostasAvaliadas.query(function(propostas){
       $scope.votingCount = propostas.length;
        updateProgress();
      });
    });

    $scope.$on('logout', function(){
      $scope.showRanking = false;
      $scope.votingCount = 0;
      $scope.progressSize = 0;
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

    function updateProgress(){
      if($scope.votingCount >= $scope.votinglevel){
        $scope.showRanking = true;
      } else {
        $scope.progressSize = 100*$scope.votingCount/$scope.votinglevel + '%';
      }
    };

    $scope.getSomeRandomProposals = function(){
      proposalsGetter.getRandomProposals(150).then(
        function(proposalsList){
          $scope.proposals = proposalsList;
          $scope.getNextProposal();
          proposalIndex = 1;
        });
    };

    $scope.getNextProposal = function(){
      setDefaultAuthor();
      $scope.$broadcast('newproposalblindtest');
      $scope.proposal = $scope.proposals[proposalIndex++];
      $scope.showRatingInfo = false;
    };

    function setDefaultAuthor(){
      $scope.proposalAuthor = {
        foto: '/images/generic_avatar.jpg',
        nome_urna: 'Candidato',
        partido: 'Partido'
      };
    }

    $scope.getProposalAuthor = function() {
      var obj = $scope.profiles;
      var id = $scope.proposal.politicians_id;

      for (var i=0; i<obj.length;i++) {
        if(obj[i].id == id){
          $scope.proposalAuthor = obj[i];
        }
      }
    };
  });
