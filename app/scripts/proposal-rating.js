'use strict';
angular.module('projetobrasilFrontApp')
.factory('Rating', ['$resource', function($resource){
  return $resource('http://api.projetobrasil.org:4242/v1/rating/:ratingId', {}, {cache:true});
}])
.factory('UserRatings', ['$resource',function($resource){
  return $resource('http://api.projetobrasil.org:4242/v1/profile/ratings', {},  {
    list : {
      method : 'GET',
      cache : true
    }});
}])
.controller('ProposalVotingCtrl', function($scope, $log, Rating, $http, profileGetter, UserRatings){

  if(angular.isUndefined($scope.userVotes) || $scope.userVotes === null){
    $scope.userVotes = {};
  }

  profileGetter.getProfile().then(function(profiles) {
    if(!profiles) return;
    $scope.userVotes = UserRatings.list();
  });

  $scope.$on('login', function(){
    $scope.userVotes = UserRatings.list();
  });
  $scope.$on('logout', function(){
      $scope.userVotes = {};
  });

  //Solucao de contorno para quando o escopo nao tem o ID,
  //apenas o escopo do pai
  var proposalId = typeof($scope.proposal) === 'undefined' ? $scope.id : $scope.proposal.id
  $scope.rate = $scope.userVotes[proposalId];

})
.directive('proposalrating', function($http, $log){
  return {
    controller: 'ProposalVotingCtrl',
    restrict: 'E',
    templateUrl: 'views/proposal-rating.html'
  };
});
