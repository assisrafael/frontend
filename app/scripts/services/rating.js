'use strict';

angular.module('projetobrasilFrontApp')
.factory('Rating', ['$resource',
  function($resource){
    return $resource('http://api.projetobrasil.org:4242/v1/rating/:ratingId', {}, {});
  }])
.factory('UserRatings', ['$resource',
  function($resource){
    return $resource('http://api.projetobrasil.org:4242/v1/profile/ratings');
  }]);
