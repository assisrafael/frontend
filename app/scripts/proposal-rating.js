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

  $scope.user_rating = 3;
    $scope.id = 1;

  //Solucao de contorno para quando o escopo nao tem o ID, apenas o escopo do pai

  $scope.rate = $scope.userVotes[typeof($scope.proposal)==='undefined' ? $scope.id : $scope.proposal.id ];

  $scope.isReadonly = false;

  $scope.$on('rate', function(newVal, oldVal, scope){
    $log.info('Mudou!' + scope.proposal.id + " De " + oldVal + ' para ' + newVal);
   // $scope.saveRate(scope.proposal.id, newVal);
    //scope.userVote = newVal;
  });
})
.directive('proposalrating', function($http, $log){

   function link(scope, element, attrs){
      function hoveringOver(value) {
        // $scope.overStar = value;
        // $scope.percent = 100 * (value / $scope.max);
      };

      scope.saveRate = function(id, newVal) {
        if( newVal > 0){
          $http.post('http://api.projetobrasil.org:4242/v1/rating/' + id, {nota: newVal})
          .success(function(){
            ga('send', 'event', 'rating', 'rated');
          });
          $log.info("Mudei");
        }
      };
    }

  return {
    controller: 'ProposalVotingCtrl',
    restrict: 'E',
    templateUrl: 'views/proposal-rating.html',
    link: link,
  };
});
