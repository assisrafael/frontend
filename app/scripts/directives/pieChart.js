'use strict';

angular.module('projetobrasilFrontApp').directive('pieChart', [function() {
    return {
      restrict: 'EA',
      scope: {
        data: '=',
        filter: '=',
        onClick: '&'
      },
      link: function(scope, iElement) {
        // setup variables
        var width, height, radius;
        width = d3.select(iElement[0])[0][0].offsetWidth - 20;
          // 20 is for margins and can be changed
        height = 200;
        radius = Math.min(width, height) / 2;

        var svg = d3.select(iElement[0])
            .append('svg')
              .attr('width', '100%')
              .attr('height', height)
            .append('g')
              .attr('transform', 'translate(' + width / 2 + ',' + height / 2 + ')');


        var color = {
          '1' : '#7EC5AC',
          '2' : '#4DA485',
          '3' : '#308D6C',
          '4' : '#1A7957',
          '5' : '#086041'
        };

        var arc = d3.svg.arc()
          .outerRadius(radius - 10)
          .innerRadius(0);

        var pie = d3.layout.pie()
          .sort(null)
          .value(function(d) {
            return d.valor;
          });

        // watch for data changes and re-render
        scope.$watch('data', function(newVals) {
          if(newVals && newVals.$resolved){
            return scope.render(newVals);
          }
        }, true);

        scope.$watch('filter', function(newValue) {
          if(typeof newValue !=='undefined') {
            return scope.render(scope.data);
          }
        }, true);

        //filter the elements
        var applyFilter = function(estados){
          var result;
          //There is ALWAYS only one state
          estados.forEach(function(elem){
            if (elem.nome === scope.filter) {
              result = elem.notas;
            }
          });
          return result;
        };

        // define render function
        scope.render = function(data){
          // remove all previous items before render
          svg.selectAll('*').remove();

          data = (scope.filter)  ? applyFilter(data.estados) : data.notas;

          if(!data) { return; }

          data.forEach(function(d) {
            d.valor = +d.valor;
          });

          var g = svg.selectAll('.arc')
              .data(pie(data))
            .enter().append('g')
              .attr('class', 'arc');

          g.append('path')
              .attr('d', arc)
              .style('fill', function(d) { return color[d.data.label]; });

          g.append('text')
              .attr('transform', function(d) { return 'translate(' + arc.centroid(d) + ')'; })
              .attr('dy', '.35em')
              .style('text-anchor', 'middle')
              .attr('dominant-baseline', 'central')
              .attr('font-family', 'FontAwesome')
              .attr('fill', '#FFCC28')
              .text(function(d) {
                var porcentagem = (d.data.porcentagem*100) + "%",
                    estrela = "\uf005";

                return d.data.label + " " + estrela;
              });

        };
      }
    };
  }]);
