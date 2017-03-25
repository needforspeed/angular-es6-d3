import d3 from '../d3';
import { PieComponent } from './pie.component';

export default angular.module('angular.d3.pie', [d3]).
component(PieComponent.selector, PieComponent).
name;
