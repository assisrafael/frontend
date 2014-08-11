angular.module('projetobrasilFrontApp')
  .controller('HeaderCtrl', function ($scope, headerInfos) {
    $scope.headerInfos = headerInfos;
    headerInfos.setTitle("Página Inicial :: Projeto Brasil");
  });
