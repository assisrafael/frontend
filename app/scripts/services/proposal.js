'use strict';

angular.module('projetobrasilFrontApp')
  .factory('Proposal', ['$http',
  function ($http){
    var serverUri = 'http://api.projetobrasil.org:4242/v1/proposal/';
    return {
      getProposal: function(proposalId){
        return $http.get(serverUri + proposalId).then(function (result){
          return result.data;
        })
      }
    }
  }]);
