'use strict';

angular.module('projetobrasilFrontApp').factory('Proposal', ['$resource',
  function($resource){
    return $resource('http://api.projetobrasil.org:4242/v1/proposal/:proposalId', {}, {});
  }]);