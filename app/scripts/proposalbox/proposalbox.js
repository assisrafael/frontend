
'use strict';
angular.module('projetobrasilFrontApp')
  .directive('proposalbox', function(){

    function link(scope, element, attrs){

      scope.testeCego = false;

      if(attrs.hasOwnProperty('showMoreDetailsLink')){
        scope.showMoreDetailsLink = true;
      }

      if(attrs.hasOwnProperty('testeCego')){
        scope.testeCego = true;
      }

    }

    return {
      restrict: 'E',
      templateUrl: 'views/proposalbox.html',
      controller: 'ProposalVotingCtrl',
      link: link
    }
  });
