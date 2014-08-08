'use strict';

angular.module('projetobrasilFrontApp')
.factory('historyGetter', function ($rootScope, $http) {

  return {
    getAllHistoryFacts: function(id) {
      //return the promise directly.
      return $http.get($rootScope.apiBaseUrl + 'politician/' + id + '/curriculum', { cache: true})
      .then(function(result) {
        //resolve the promise as the data
        return result.data;
      });
    }
  }
});
