'use strict';

angular.module('projetobrasilFrontApp')
.factory('graphRating', ['$rootScope', '$resource',
  function($rootScope, $resource){
    return $resource($rootScope.apiBaseUrl+'graphRating/:ratingId', {}, {});
  }]);
