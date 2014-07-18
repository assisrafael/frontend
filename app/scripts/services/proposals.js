'use strict';

angular.module('projetobrasilFrontApp')
.factory('proposalsGetter', function ($http) {
	var serverUri = 'http://api.projetobrasil.org:4242/v1';

	return {
		getProposal: function(id) {
			//return the promise directly.
			return $http.get(serverUri + '/proposal/' + id)
			.then(function(result) {
				//resolve the promise as the data
				return result.data;
			});
		},
		getAllProposals: function() {
			//return the promise directly.
			return $http.get(serverUri + '/proposals')
			.then(function(result) {
				//resolve the promise as the data
				return result.data;
			});
		},
		getPoliticianProposals: function(id) {
			//return the promise directly.
			return $http.get(serverUri + '/politician/' + id + '/proposals')
			.then(function(result) {
				//resolve the promise as the data
				return result.data;
			});
		}
	}
});
