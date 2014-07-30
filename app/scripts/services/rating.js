'use strict';

angular.module('projetobrasilFrontApp')
.factory('Rating', ['$resource',
  function($resource){
    return $resource('http://api.projetobrasil.org:4242/v1/rating/:ratingId', {ratingId:'@id'});
// angular.module('projetobrasilFrontApp').factory('Rating', ['$http',
//   function($http){
//     var serverUri = 'http://api.projetobrasil.org:4242/v1/rating/';
//     return {
//       getRating: function(proposalId){
//         return $http.get(serverUri + proposalId).then(function (result){
//           return result.data;
//         })
//       }
//     }
  }]);
