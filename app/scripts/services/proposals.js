'use strict';

angular.module('projetobrasilFrontApp')
.factory('proposalsGetter', function ($http) {
  return {
    getProposals: function(id) {
    //return the promise directly.
      console.log('http://api.projetobrasil.org:4242/v1/politician/'+id+'/proposals');
      $http.get('http://api.projetobrasil.org:4242/v1/politician/'+id+'/proposals')
      .success(function(result) {
      //resolve the promise as the data
        console.log('sucesso')
        return result.data;
      });
    }
  }
});
