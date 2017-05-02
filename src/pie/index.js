import d3 from '../d3';
import d3Legend from '../d3-legend';
import { PieComponent } from './pie.component';
import './pie.css';
import Utils from '../utils'

export default angular.module('angular.d3.pie', [d3, d3Legend, Utils])
  .component(PieComponent.selector, PieComponent)
  .name;
