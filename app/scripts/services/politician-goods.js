'use strict';

angular.module('projetobrasilFrontApp')
  .factory('goodsGetter', function ($http) {
    var serverUri = 'http://api.projetobrasil.org:4242/v1';

    return {
      getAllGoods: function(id) {
        //return the promise directly.
        return $http.get(serverUri + '/politician/' + id + '/goods')
        .then(function(result) {
          //resolve the promise as the data
          return result.data;
        });
      }
    }
  });
