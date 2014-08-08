'use strict';

angular.module('projetobrasilFrontApp')
  .factory('goodsGetter', function ($rootScope, $http) {

    return {
      getAllGoods: function(id) {
        //return the promise directly.
        return $http.get($rootScope.apiBaseUrl + 'politician/' + id + '/goods', { cache: true})
        .then(function(result) {
          //resolve the promise as the data
          return result.data;
        });
      }
    }
  });
