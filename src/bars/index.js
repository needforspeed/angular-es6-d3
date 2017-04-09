/**
 * Created by zyc on 2017/4/9.
 */

import d3 from '../d3';
import d3Legend from '../d3-legend';
import { BarComponent } from './bar.component';
import './bar.css';

export default angular.module('angular.d3.bar', [d3, d3Legend])
  .component(BarComponent.selector, BarComponent)
  .name;
