import angular from 'angular';
import pie from './pie';
import FetchDataController from './FetchDataController';

angular.module('angular.d3', [pie])
.controller('FetchDataController', FetchDataController);

