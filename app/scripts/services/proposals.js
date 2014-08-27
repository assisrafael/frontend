'use strict';

angular.module('projetobrasilFrontApp')
.factory('proposalsGetter', function ($rootScope, $http) {

	return {
		getProposal: function(id) {
			//return the promise directly.
			return $http.get($rootScope.apiBaseUrl + 'proposal/' + id, { cache: true})
			.then(function(result) {
				//resolve the promise as the data
				return result.data;
			});
		},
		getAllProposals: function() {
			//return the promise directly.
			return $http.get($rootScope.apiBaseUrl + 'proposals', { cache: true})
			.then(function(result) {
				//resolve the promise as the data
				return result.data;
			});
		},
		getPoliticianProposals: function(id) {
			//return the promise directly.
			return $http.get($rootScope.apiBaseUrl + 'politician/' + id + '/proposals', { cache: true})
			.then(function(result) {
				//resolve the promise as the data
				return result.data;
			});
		},
    getRandomProposals: function(count) {
      return $http.get("http://api.projetobrasil.org:4242/v1/blindTest/proposals/sort/" + count)
      .then(function(result){
        return result.data;
      });
    }
	}
});
