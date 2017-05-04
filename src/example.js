import angular from 'angular';
import pie from './pie';
import bars from './bars';
import stackedBars from './stacked-bars';
import lines from './lines';
import FetchDataController from './FetchDataController';

angular.module('angular.d3', [pie, bars, stackedBars, lines])
.controller('FetchDataController', FetchDataController);
