'use strict'

angular.module('projetobrasilFrontApp')
  .controller('PoliticiansRankingCtrl', ['$scope', '$rootScope', 'UserRatings', 'profileGetter', 'testeCego',
    function($scope, $rootScope, UserRatings, profileGetter, testeCego){

    $scope.position = 0;

    profileGetter.getProfile().then(function(profiles) {
      if(!profiles) return;
      $scope.politicians = profiles;
      initializePoliticianStats();
      getUserHistory();
    });

    $scope.ranking = {};
    $scope.ranking.num_total_propostas = 0;
    $scope.ranking.somatorio_notas = 0;

    // Inicializa os dados dos políticos para o ranking
    function initializePoliticianStats(){
      _.each($scope.politicians, function(politician){
        politician.soma = 0;
        politician.num_propostas = 0;
        politician.media = 0;
      });
    }

    function getUserHistory(){

      testeCego.propostasAvaliadas.query(function(propostas){
        // Agrupa propostas por politico
        var propostas_agrupadas = _.groupBy(propostas, function(prop){
          $scope.ranking.somatorio_notas += prop.nota;
          $scope.ranking.num_total_propostas += 1;
          return prop.politicians_id
        });

        _.each(propostas_agrupadas, function(grupo, id){

          // Calcula a posição do político no vetor politicians
          var tempArray = _.map($scope.politicians, function(p){ return p.id });
          var position = _.indexOf(tempArray, id);

          // Somas as notas das propostas do politico
          var soma_notas = _.reduce(grupo, function(memo, proposal){
            return memo + proposal.nota
          }, 0);

          // Atribui os valores aos atributos do respectivo politico
          $scope.politicians[position].soma = soma_notas;
          $scope.politicians[position].num_propostas = grupo.length;
          $scope.politicians[position].media = soma_notas/grupo.length;
        });

      });

    };

  }])
  .directive('politiciansRanking', [function(){
    function link(scope, element, attrs){}

    return {
      restrict: 'E',
      templateUrl: 'views/politicians-ranking.html',
      controller: 'PoliticiansRankingCtrl',
      link: link
    }
  }]);
