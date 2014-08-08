'use strict';

angular.module('projetobrasilFrontApp')
.factory('Rating', ['$rootScope', '$resource',
  function($rootScope, $resource){
    return $resource($rootScope.apiBaseUrl + 'rating/:ratingId', {}, {});
  }])
.factory('UserRatings', ['$rootScope', '$resource',
  function($rootScope, $resource){
    return $resource($rootScope.apiBaseUrl + 'profile/ratings');
  }]);
