/**
* projetoBrasilFront Module
*
* Description
*/
angular.module('projetobrasilFrontApp')
  .controller('DashboardCtrl', ['$scope', '$rootScope', 'profileGetter', 'proposalsGetter', function($scope, $rootScope, profileGetter, proposalsGetter){

    profileGetter.getProfile().then(function(politicians) {
      $scope.politicians = politicians;
    });

    var proposalIndex;
    $scope.proposalsBucket = [];
    proposalsGetter.getRandomProposals(4).then(
      function(proposalsList){
        _.each(proposalsList, function(item){
          $scope.proposalsBucket.push(item);
        });
      });

    function getNewProposal(){
      proposalGetter.getRandomProposal(1).then(
        function(proposals){
          $scope.proposalsBucket.push(proposals);
        });
    };

    function removeProposal(proposal){
      $scope.proposalsBucket = _.filter($scope.proposalsBucket, function(item){return proposal.id !== item.id});
      getNewProposal();
    }

  }])
