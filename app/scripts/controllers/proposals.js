'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsCtrl',
  function ($scope, $stateParams, proposalsGetter, categoryColorGetter, $log, $http) {
    $scope.count = 0;
    $scope.categories = [
    'Cultura e Turismo',
    'Democracia e Reforma Política',
    'Desenvolvimento Econômico',
    'Direitos Humanos e Inclusão social',
    'Educação',
    'Esporte e lazer',
    'Gestão Pública',
    'Infraestrutura',
    'Liberdades civis',
    'Segurança Pública',
    'Meio-ambiente',
    'Política Econômica',
    'Política Externa e Defesa Nacional',
    'Políticas Sociais',
    'Saúde',
    'Outros'
    ];

    $scope.myFilter = [];

    $scope.isCollapsed = true;

    $scope.filterChange = function(category){
      var indexCat = $scope.myFilter.indexOf(category);
      if(indexCat == -1){
        $scope.myFilter.push(category);
      }else{
        $scope.myFilter.splice(indexCat, 1);
      }
    }

    $scope.$watch('selectedPolitical', function(politician) {
      if(!politician) return;

      proposalsGetter.getPoliticianProposals(politician.id).then(
        function(data) {
         $scope.proposals = data;

         for (var i = 0; i < data.length; i++) {
          $scope.proposals[i].cor = categoryColorGetter.getColorTheme($scope.proposals[i].tema);
        };
      });
    });

  })
;
