/**
 * Created by zyc on 2017/4/22.
 */

import d3 from '../d3';
import d3Legend from '../d3-legend';
import { LinesComponent } from './lines.component';
import './lines.css';
import Utils from '../utils';

export default angular.module('angular.d3.lines', [d3, d3Legend, Utils])
  .component(LinesComponent.selector, LinesComponent)
  .name;
