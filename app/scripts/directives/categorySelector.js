angular.module('projetobrasilFrontApp').directive('categorySelector', function ($document){

  return {
    restrict: 'A',
    link: function(scope, element, attributes){

      var click = function(event){
        var allowedArea = $('.collapsable-filters, .category-filter, .category-filter input, #btnFiltro');
        if( !$(event.target).is(allowedArea) ){
          scope.isCollapsed = true;
          scope.$digest();
        }
      }

      scope.$watch('isCollapsed', function(newValue, oldValue){
        if(newValue){
          $document.unbind('click', click);
        }else{
          $document.bind('click', click);
        }
      })

    }
  }

});
