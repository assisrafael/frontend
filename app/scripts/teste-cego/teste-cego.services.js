'use strict';

angular.module('projetobrasilFrontApp')
  .factory('testeCego', ['$rootScope', '$resource',
    function($rootScope, $resource){
      return {
        propostasAvaliadas: $resource( $rootScope.apiBaseUrl+'blindtest/user/ratings', {}, {
          query: { method: 'GET', params: {}, isArray: true}
        })
      }
    }]);
