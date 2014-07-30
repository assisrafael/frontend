'use strict';

angular.module('projetobrasilFrontApp')
.factory('Rating', ['$resource',
  function($resource){
    return $resource('http://api.projetobrasil.org:4242/v1/rating/:ratingId', {}, {});
  }]);
