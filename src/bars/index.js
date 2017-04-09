/**
 * Created by zyc on 2017/4/9.
 */

import d3 from '../d3';
import d3Legend from '../d3-legend';
import { BarsComponent } from './bars.component';
import './bars.css';

export default angular.module('angular.d3.bars', [d3, d3Legend])
  .component(BarsComponent.selector, BarsComponent)
  .name;
