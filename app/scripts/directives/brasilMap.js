'use strict';

angular.module('projetobrasilFrontApp').directive('brasilMap', [function() {
    return {
      restrict: 'EA',      
      scope: {
        data: '=',
        filter: '='
      },
      link: function(scope, iElement) {
        // setup variables
        var width, height;
        width = d3.select(iElement[0])[0][0].offsetWidth - 20;
          // 20 is for margins and can be changed
        height = 300;
        
        var chart = map.viz()
          .container(iElement[0])
          .id('id')
          .map({
            'topojson': '../scripts/plugins/map/resources/br-states.min.json',
            'unit': 'states',
            'key': 'name'
          })
          .color({
            'key': function(d) {
              return d.valor;
            },
            'domain': [-1, 1],
            'range': ['#98abc5', '#a05d56']
          })
          .width(width)
          .height(height)
          .onclick(function(d) {
            scope.setFilter(d.properties.name);
          });
          scope.filter = scope.filter;
          scope.setFilter =function setFilter(state) {
            scope.filter = state;
            scope.$apply();
          };
          
        // watch for data changes and re-render
        scope.$watch('data', function(newVals) {
          if(newVals && newVals.$resolved){
            return scope.render(newVals);
          }
        }, true);

        // define render function
        scope.render = function(data){
          // remove all previous items before render
          //svg.selectAll('*').remove();
          chart.data(data.estados)
            .draw();
        };
      }
    };
  }]);

