'use strict';

angular.module('projetobrasilFrontApp')
.factory('profileGetter', function ($rootScope, $http) {
	return {
		getProfile: function() {
		//return the promise directly.
			return $http.get($rootScope.apiBaseUrl+'politicians', { cache: true})
			.then(function(result) {
			//resolve the promise as the data
				return result.data;
			});
		}
	}
});
