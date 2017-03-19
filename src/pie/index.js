import angular from 'angular';
import { PieComponent } from './pie.component';

export default angular.module('angular.d3.pie', []).
component(PieComponent.selector, PieComponent).
name;

