'use strict'

angular.module('projetobrasilFrontApp')
  .controller('PoliticiansRankingCtrl', ['$scope', '$rootScope', 'UserRatings', 'profileGetter', 'testeCego',
    function($scope, $rootScope, UserRatings, profileGetter, testeCego){

    $scope.position = 0;

    profileGetter.getProfile().then(function(profiles) {
      if(!profiles) return;
      $scope.politicians = profiles;
    });

    $scope.ranking = {};
    $scope.ranking.num_total_propostas = 0;
    $scope.ranking.somatorio_notas = 0;
    testeCego.propostasAvaliadas.query(function(propostas){
      var propostas_agrupadas = _.groupBy(propostas, function(prop){
        $scope.ranking.somatorio_notas += prop.nota;
        $scope.ranking.num_total_propostas += 1;
        return prop.politicians_id
      });


      _.each(propostas_agrupadas, function(grupo, id){

        $scope.ranking[id] = {}

        var soma_notas = _.reduce(grupo, function(memo, proposal){
          return memo + proposal.nota
        }, 0);

        $scope.ranking[id].soma = soma_notas;
        $scope.ranking[id].num_propostas = grupo.length;

      });

    });

    }
  ])
  .directive('politiciansRanking', [function(){
    function link(scope, element, attrs){}

    return {
      restrict: 'E',
      templateUrl: 'views/politicians-ranking.html',
      controller: 'PoliticiansRankingCtrl',
      link: link
    }
  }]);
