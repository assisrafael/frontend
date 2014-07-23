'use strict';

angular.module('projetobrasilFrontApp')
  .controller('GoodsCtrl', function ($scope, goodsGetter) {
    $scope.$watch('selectedPolitical', function(politician) {
      if(!politician) return;

      goodsGetter.getAllGoods(politician.id).then(function(data) {
        $scope.politician_goods = data;

        $scope.totalValue = 0.0;
        var arrayLenght = $scope.politician_goods.length;

        for (var i =  arrayLenght - 1; i >= 0; i--) {
          $scope.totalValue += parseFloat($scope.politician_goods[i]['valor']);
        };
      });


    });
  });
