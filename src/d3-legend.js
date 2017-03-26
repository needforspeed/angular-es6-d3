import legend from 'd3-svg-legend';

export default angular.module('angular.d3Legend.wrapper', [])
  .factory('D3LegendFactory', () => legend)
  .name;
