'use strict';

angular.module('projetobrasilFrontApp').filter('propCategoryFilter', function () {
  return function (items, categories){
    if(!items || !categories) return;

    var filtered = [];
    if(categories.length == 0){
      return items;
    }

    angular.forEach(items, function(item){
      if(categories.indexOf(item.tema) != -1){
        filtered.push(item);
      }
    });
    return filtered;
  }
})
