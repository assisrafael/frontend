
'use strict';
angular.module('projetobrasilFrontApp')
  .directive('proposalbox', function(){

    function link(scope, element, attrs){
      if(attrs.hasOwnProperty('showMoreDetailsLink')){
        scope.showMoreDetailsLink = true;
      }
    }

    return {
      restrict: 'E',
      templateUrl: 'views/proposalbox.html',
      controller: 'ProposalVotingCtrl',
      link: link
    }
  });
