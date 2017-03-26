import * as d3 from 'd3';

export default angular.module('angular.d3.wrapper', [])
  .factory('D3Factory', () => d3)
  .name;
