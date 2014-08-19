
'use strict';
angular.module('projetobrasilFrontApp')
.factory('UserRatings', ['$resource',function($resource){
  return $resource('http://api.projetobrasil.org:4242/v1/profile/ratings', {},  {
    list : {
      method : 'GET',
      cache : true
    }});
}])
.controller('ProposalboxCtrl', function($scope, $log, $http, profileGetter, UserRatings, categoryColorGetter){

  if(angular.isUndefined($scope.userVotes) || $scope.userVotes === null){
    $scope.userVotes = {};
  }

  $scope.getColor = function(tema){
    return categoryColorGetter.getColorTheme(tema);
  };

  //se náo foi definido no scopo do pai, define agora
  $scope.notifyUrl = typeof($scope.notifyUrl) === 'undefined' ? 'http://api.projetobrasil.org:4242/v1/rating' : $scope.notifyUrl;

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
.directive('proposalbox', function(){

    function link(scope, element, attrs){

      scope.testeCego = false;

      if(attrs.hasOwnProperty('showMoreDetailsLink')){
        scope.showMoreDetailsLink = true;
      }

      if(attrs.hasOwnProperty('testeCego')){
        scope.testeCego = true;
      }

    }

    return {
      restrict: 'E',
      templateUrl: 'views/proposalbox.html',
      controller: 'ProposalboxCtrl',
      link: link
    }
  });
