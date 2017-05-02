/**
 * Created by zyc on 2017/4/9.
 */

import d3 from '../d3';
import d3Legend from '../d3-legend';
import { StackedBarsComponent } from './stacked.bars.component';
import './stacked.bars.css';
import Utils from '../utils'

export default angular.module('angular.d3.stackedBars', [d3, d3Legend, Utils])
  .component(StackedBarsComponent.selector, StackedBarsComponent)
  .name;
