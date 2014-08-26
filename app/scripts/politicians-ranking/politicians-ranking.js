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

    $scope.num_total_propostas = 0;
    $scope.somatorio_notas = 0;
    $scope.media_propostas = 0;

    $scope.$on('rated', function(ev, rating){

      var cand = $scope.proposalAuthor.nome_urna;
      // Calcula a posição do político no vetor politicians
      var tempArray = _.map($scope.politicians, function(p){ return p.nome_urna });
      var position = _.indexOf(tempArray, cand);

      // Atualiza os dados do ranking
      $scope.num_total_propostas += 1;
      $scope.somatorio_notas += parseInt(rating);
      $scope.politicians[position].num_propostas += 1;
      $scope.politicians[position].soma += parseInt(rating);
      $scope.politicians[position].media = $scope.politicians[position].soma / $scope.politicians[position].num_propostas;

    });

    $scope.$on('login', function(){
      getUserHistory();
    });

    $scope.$on('logout', function(){
      initializePoliticianStats();
      $scope.num_total_propostas = 0;
      $scope.somatorio_notas = 0;
      $scope.media_propostas = 0;
    });

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
          $scope.somatorio_notas += prop.nota;
          $scope.num_total_propostas += 1;
          return prop.politicians_id
        });

        if($scope.num_total_propostas === 0){
          $scope.media_propostas = 0;
        }else{
          $scope.media_propostas = $scope.somatorio_notas / $scope.num_total_propostas
        }

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
