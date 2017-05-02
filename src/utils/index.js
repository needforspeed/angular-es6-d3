/**
 * Created by zyc on 2017/4/15.
 */

import Utils from './utils.factory';

export default angular.module('angular.d3.utils', [])
  .factory('Utils', () => new Utils())
  .name;
