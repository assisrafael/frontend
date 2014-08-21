'use strict';

angular.module('projetobrasilFrontApp')
.controller('TesteCegoCtrl',
  function ($scope, $filter, $rootScope, $timeout, proposalsGetter, hotkeys, profileGetter) {

    $scope.proposals = {};
    var progressNumber = 10;
    $scope.progress = progressNumber + '%';
    $scope.automaticfoward = true;

    $scope.proposalAuthor = {};
    setDefaultAuthor();

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
<<<<<<< HEAD
      $scope.$$childTail.enableRating();
      $scope.$$childTail.over = 0;

      setDefaultAuthor();

=======
      $scope.$broadcast('newproposalblindtest');
>>>>>>> f34da23ce0bec4bcabc0a575ac83f0c766970864
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
