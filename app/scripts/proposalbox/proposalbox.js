
'use strict';
angular.module('projetobrasilFrontApp')
  .directive('proposalbox', function(){
    return {
      restrict: 'E',
      templateUrl: 'views/proposalbox.html',
      controller: 'ProposalVotingCtrl',
    }
  });
