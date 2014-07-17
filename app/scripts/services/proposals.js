'use strict';

angular.module('projetobrasilFrontApp')
.factory('proposalsGetter', function ($http) {
	return {
		getProposals: function(id) {
			//return the promise directly.
			return $http.get('http://api.projetobrasil.org:4242/v1/politician/' + id + '/proposals')
			.then(function(result) {
				console.log('Get proposals');
				console.log(result.data);
				//resolve the promise as the data
				return result.data;
			});
		}
	}
});
