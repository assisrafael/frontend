'use strict';

angular.module('projetobrasilFrontApp')
  .controller('HistoryCtrl', function ($scope, historyGetter) {
    $scope.$watch('selectedPolitical', function(politician) {
      if(!politician) return;

      historyGetter.getAllHistoryFacts(politician.id).then(function(data) {
        $scope.politician_history = data;
      });

      $scope.getClassForHistoryFact = function(category){
        var classValue = 'fa fa-suitcase green';
        switch(category){
          case 'Político':
            classValue = 'fa fa-institution';
            break;
          case 'Profissional':
            classValue = 'fa fa-suitcase green';
            break;
          case 'Acadêmico':
            classValue = 'fa fa-graduation-cap purple';
            break;
        }
        return classValue;
      }
    });
  });
