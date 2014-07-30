'use strict';

angular.module('projetobrasilFrontApp')
.factory('graphRating', ['$resource',
  function($resource){
    return $resource('http://api.projetobrasil.org:4242/v1/graphRating/:ratingId', {}, {});
  }]);
