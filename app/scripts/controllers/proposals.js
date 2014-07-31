'use strict';

angular.module('projetobrasilFrontApp')
.controller('ProposalsCtrl', function ($scope, $stateParams, proposalsGetter, categoryColorGetter, $log, $http) {

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
    'Política Economica',
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

		proposalsGetter.getPoliticianProposals(politician.id).then(function(data) {
			$scope.proposals = data;

      for (var i = 0; i < data.length; i++) {
        $scope.proposals[i].cor = categoryColorGetter.getColorTheme($scope.proposals[i].tema);
      };
		});

  });


})
.controller('ProposalVotingCtrl', function($scope, $log, Rating, $http){

  //Solucao de contorno para quando o escopo nao tem o ID, apenas o escopo do pai
  $scope.rate = $scope.$parent.userVotes[typeof($scope.proposal)==='undefined' ? $scope.id : $scope.proposal.id ];

  $scope.max = 5;
  $scope.isReadonly = false;
  $scope.userVote = 2;

  $scope.hoveringOver = function(value) {
    $scope.overStar = value;
    $scope.percent = 100 * (value / $scope.max);
  };

  $scope.saveRate = function(id, newVal) {
    if( newVal > 0){
      $http.post('http://api.projetobrasil.org:4242/v1/rating/' + id, {nota: newVal});
      $log.info('salveis' + id + '----- '+ newVal);
    }
  };

  // $scope.$on('rate', function(newVal, oldVal, scope){
  //   $log.info('Mudou!' + scope.proposal.id + " De " + oldVal + ' para ' + newVal);
  //  // $scope.saveRate(scope.proposal.id, newVal);

  //   // Rating.post({ratingId: scope.proposal.id, nota: newVal});
  //   //scope.userVote = newVal;
  // });
});
