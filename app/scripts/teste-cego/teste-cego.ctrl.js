'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, $timeout, $location, proposalsGetter, hotkeys, profileGetter, testeCego, Angularytics) {

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
      Angularytics.trackEvent("Teste cego", "voto cego", '' , $scope.votingCount);
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
      $scope.proposalAuthor.foto = '/images/generic_avatar.jpg';
      $scope.proposalAuthor.nome_urna = 'Candidato';
      $scope.proposalAuthor.partido = 'Partido';
    }

    $scope.getProposalAuthor = function() {
      var obj = $scope.profiles;
      var id = $scope.proposal.politicians_id;

      for (var i=0; i<obj.length;i++) {
        if(obj[i].id == id){
          $scope.proposalAuthor['foto'] = obj[i]['foto'];
          $scope.proposalAuthor['nome_urna'] = obj[i]['nome_urna'];
          $scope.proposalAuthor['partido'] = obj[i]['partido'];
        }
      }
    };

    $scope.pageTitle = "Teste Cego :: Projeto Brasil";
    $scope.og = {
      url : $location.absUrl(),
      siteName : 'projetobrasil.org',
      title : 'Teste cego de propostas - Projeto Brasil',
      description : 'Vote nas propostas sem preconceito e descubra com quais candidatos você tem mais afinidade',
      imageUrl : $location.protocol() + "://" +  $location.host() + '/images/facebook-share-images/teste-cego.jpg',
      imageWidth : '248',
      imageHeight : '248'
    };
  });
