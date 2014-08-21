'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, $timeout, proposalsGetter, hotkeys, profileGetter, testeCego, Angularytics) {

    $scope.proposals = {};
    $scope.automaticfoward = true;
    $scope.showRanking = false;
    $scope.progressSize = 0;
    $scope.progressCount = 0;
    $scope.votinglevel = 20;

    function updateProgress(count){
      Angularytics.trackEvent("Teste cego", "voto cego", '' , count);
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

    $scope.proposalAuthor = {};
    setDefaultAuthor();

    $scope.$on('rated', function(ev, count){
      updateProgress(count);
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
      setDefaultAuthor();
      $scope.$broadcast('newproposalblindtest');
      $scope.proposal = $scope.proposals[proposalIndex++];
      $scope.showRatingInfo = false;
    };

    function setDefaultAuthor(){
      $scope.proposalAuthor.foto = '/images/generic_avatar.jpg';
      $scope.proposalAuthor.nome_urna = 'Candidato';
      $scope.proposalAuthor.partido = 'Partido';
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
