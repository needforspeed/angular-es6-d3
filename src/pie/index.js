import d3 from '../d3';
import d3Legend from '../d3-legend';
import { PieComponent } from './pie.component';

export default angular.module('angular.d3.pie', [d3, d3Legend])
  .component(PieComponent.selector, PieComponent)
  .name;
