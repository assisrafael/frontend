"use strict";

(function(){
  var map = window.map || {};
  window.map = map;

  map.version = '0.0.1';

  map.viz = function() {

    // configuration variables / default values
    var config = {

      // the DOM element that will contain the map
      'container': undefined,

      // json with the data
      'data': undefined,

      // Key to be used as each data point's unique identifier
      'id': 'id',

      // Object for defining both the topojson of the desired map and the name of the object
      // Key: 'topojson'
      // Description: Map topojson
      // Key: 'unit'
      // Description: Name of the topojson object with the features.
      // Key: 'key'
      // Description: The property of the map feature that will be used as id
      'map': undefined,

      // Object for defining what should affect the color of the geo unit
      // Key: 'key'
      // Description: It may be a key in the data to be associated with the color variable; it may also be a function.
      // Key: 'domain'
      // Description: Domain to be used for the color (array)
      // Key: 'range'
      // Description: Array of colors to be used
      'color': {'key': undefined, 'domain': undefined, 'range': undefined, 'interpolate': false},

      // To exihibit or not an auxiliary bar chart
      // True of false.
      'bar': false,

      // hide the legend of the map
      'hideLegend': true,

      // callback function for 'onclick'
      'onclick': undefined,

      // projection
      'projection': d3.geo.mercator(),
      'center': [-55, -15]

    };

    // map with available values
    var valueById = d3.map();

    // chart implementation
    var chart = function(selection) {
      selection.datum(config.data)
        .each(function(data) {

          // watch resize
          d3.select(window).on('resize', function() {
            config.width = parseInt(selection.style('width'), 10);
            config.height = parseInt(selection.style('height'), 10);
            chart.draw();
          });

          /* -- store data -- */
          data.forEach(function(d) {

            var dataId = d[config.id];
            valueById[dataId] = {};

            // if color condition is set
            if (typeof config.color.key === 'function') {
              valueById[dataId]['color'] = config.color.key(d);
            } else valueById[dataId]['color'] = d[config.color.key];

          });

          // color scale
          var colorDomain = null;
          if (config.color.domain != null && config.color.domain != undefined) {
            colorDomain = config.color.domain;
          } else {
            colorDomain = [0, d3.max(data, function(d) {
              var dataId = d[config.id];
              return valueById[dataId]['color'];
            })]
          }

          var color = undefined;

          if (config.color.interpolate != undefined && config.color.interpolate === true) {
            color = d3.scale.linear()
            .range(config.color.range)
            .interpolate(d3.interpolateHcl)
            .domain(colorDomain);
          } else {
            color = d3.scale.quantize()
            .range(config.color.range)
            .domain(colorDomain);
          }

          // responsive chart
          config.width = (config.width ||
            parseInt(selection.style('width'), 10) ||
            500);
          config.height = (config.height ||
            parseInt(selection.style('height'), 10) ||
            500);

          // calculate width and height with margin
          var margin = {
              top: 0,
              right: 0,
              bottom: 0,
              left: 0
            },
            width = config.width - margin.left - margin.right,
            height = config.height - margin.top - margin.bottom;

          /* --- CREATE OR SELECT SVG --- */

          // select the svg element, if it exists
          var svg = d3.select(this).selectAll("svg").data([data]);

          // otherwise, create the skeletal chart
          var gEnter = svg.enter().append("svg")
            .attr('class', 'asd3-map').append("g");

          // update the outer dimensions
          svg.attr('width', width + margin.left + margin.right)
            .attr('height', height + margin.top + margin.bottom);

          /* --- DRAW MAP --- */

          // update scale
          var scale = config.scale;
          if (scale == null) {
            // update scale
            var scale = width > height ? height : width;
            scale = scale * 1.2;
          }

          // projection
          var projection = config.projection
            .scale(scale)
            .center(config.center)
            .translate([width / 2, height / 2]);

          // geo path
          var path = d3.geo.path().projection(projection);

          // load map
          d3.json(config.map.topojson, function(error, br) {

            // load geo units
            var units = topojson.feature(br, br.objects[config.map.unit]);

            // draw map
            // DATA JOIN
            var g = svg.select('g');
            var mapSelection = g.selectAll('path')
              .data(units.features);

            // ENTER
            mapSelection.enter().append('path')
              .attr('class', config.map.unit)
              .append('title');

            // ENTER + UPDATE
            g.selectAll('path').attr('d', path);

            mapSelection.attr('fill', function(d) {
                if (color != null) {
                  var name = d.properties[config.map.key];
                  if (valueById[name] != undefined) {
                    return color(valueById[name]['color']);
                  }
                }
                return '#98abc5';
              })
              .select('title')
              .text(function(d) {
                return d.properties[config.map.key].toUpperCase();
              });

            if (typeof config.onclick === 'function') {
              mapSelection.on('click', config.onclick);
            }

          });

          // legend
          if (!config.hideLegend) {
            /* -- legend -- */
            var rawDomain = color.domain().slice().reverse();

            var nOfStep = 5;

            // expand so the legend is better
            var step = Math.ceil((rawDomain[0] - rawDomain[1]) / nOfStep);
            var ldata = d3.range(rawDomain[1], rawDomain[0], step);

            var g = svg.select('g');

            // select the legend, if exists
            var legend = g.selectAll('.legend')
              .data([ldata]);

            // otherwise, create new legend
            var legEnter = legend.enter().append('g')
              .attr('class', 'legend');

            /* -- item -- */

            // DATA JOIN
            // join new data with old, if any
            var legItem = legend.selectAll('.item')
              .data(ldata);

            // ENTER
            // create new elements as needed
            var outerItem = legItem.enter().append('g')
              .attr('class', 'item');

            outerItem.append('rect');
            outerItem.append('text');

            var legWidth = Math.round(config.width / (nOfStep));

            // ENTER + UDPATE
            legItem.attr('transform', function(d, i) {
              return 'translate(' + (i * legWidth + i) + ',0)';
            });

            // ENTER + UPDATE
            legItem.select('rect')
              .attr('x', function(d, i) {
                if (i === 0) return 1;
                return 2;
              })
              .attr('y', config.height - 8)
              .attr('width', legWidth)
              .attr('height', 7)
              .style('fill', function(d, i) {
                if (i === 0) return color(rawDomain[1]);
                else if (i === nOfStep - 1) return color(rawDomain[0]);
                return color(d);
              });

            var fmt = d3.format('.2s');

            legItem.select('text')
              .attr('x', function(d, i) {
                return 25 + i;
              })
              .attr('y', config.height - 20)
              .attr('dy', '.35em')
              .style('text-anchor', 'end')
              .text(function(d, i) {
                if (i === 0) return rawDomain[1];
                else if (i === nOfStep - 1) return rawDomain[0];
                return d < 1000 ? d : fmt(d);
              });

            // EXIT
            legItem.exit().remove();
          }

        });

    };

    // getter-setter methods
    chart.container = function(value) {
      if (!arguments.length) return config.container;
      config.container = value;
      return chart;
    };

    chart.data = function(value) {
      if (!arguments.length) return config.data;
      config.data = value;
      return chart;
    };

    chart.id = function(value) {
      if (!arguments.length) return config.id;
      config.id = value;
      return chart;
    };

    chart.map = function(value) {
      if (!arguments.length) return config.map;
      config.map = value;
      return chart;
    };

    chart.color = function(value) {
      if (!arguments.length) return config.color;
      config.color = value;
      return chart;
    };

    chart.width = function(value) {
      if (!arguments.length) return config.width;
      config.width = value;
      return chart;
    };

    chart.height = function(value) {
      if (!arguments.length) return config.height;
      config.height = value;
      return chart;
    };

    chart.projection = function(value) {
      if (!arguments.length) return config.projection;
      config.projection = value;
      return chart;
    };

    chart.hideLegend = function(value) {
      if (!arguments.length) return config.hideLegend;
      config.hideLegend = value;
      return chart;
    };

    chart.scale = function(value) {
      if (!arguments.length) return config.scale;
      config.scale = value;
      return chart;
    };

    chart.center = function(value) {
      if (!arguments.length) return config.center;
      config.center = value;
      return chart;
    };

    chart.onclick = function(value) {
      if (!arguments.length) return config.onclick;
      config.onclick = value;
      return chart;
    };

    // calls drawing function
    chart.draw = function() {

      // basic validations
      if (!config.container) {
        console.log("Please define a container div using .container()");
      } else if (d3.select(config.container).empty()) {
        console.log("Cannot find <div> on page matching: \"" + config.container + "\"");
      } else if (!config.data) {
        console.log("Please define a data file using .data()");
      } else if (!config.map) {
        console.log("Please define a topojson file using .map()");
      } else if (config.map && (!config.map.topojson || !config.map.unit || !config.map.key)) {
        console.log("Please specify 'key', 'topojson' and 'unit' attributes to .map()");
      } else if (config.color && (!config.color.key || !config.color.range)) {
        console.log("Please specify 'key' and 'range' attributes to .color()");
      } else {
        d3.select(config.container).call(chart);
      }
      return chart;
    }

    // return reusable visualization
    return chart;

  };

})();
