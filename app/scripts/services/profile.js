'use strict';

angular.module('projetobrasilFrontApp')
.factory('profileGetter', function ($http) {
	return {
		getProfile: function() {
		//return the promise directly.
			return $http.get('http://api.projetobrasil.org:4242/v1/politicians', { cache: true})
			.then(function(result) {
			//resolve the promise as the data
				return result.data;
			});
		}
	}
});
