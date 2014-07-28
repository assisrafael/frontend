'use strict';

angular.module('projetobrasilFrontApp')
.factory('historyGetter', function ($http) {
  var serverUri = 'http://api.projetobrasil.org:4242/v1';

  return {
    getAllHistoryFacts: function(id) {
      //return the promise directly.
      return $http.get(serverUri + '/politician/' + id + '/curriculum')
      .then(function(result) {
        //resolve the promise as the data
        return result.data;
      });
    }
  }
});
