'use strict';

angular.module('projetobrasilFrontApp')
  .factory('Proposal', ['$rootScope', '$http',
  function ($rootScope, $http){
    return {
      getProposal: function(proposalId){
        return $http.get($rootScope.apiBaseUrl + proposalId, { cache: true}).then(function (result){
          return result.data;
        })
      }
    }
  }]);
