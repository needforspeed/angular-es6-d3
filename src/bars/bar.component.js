/**
 * Created by zyc on 2017/4/9.
 */

import BarController from './bar.controller';

export const BarComponent = {
  bindings: {
    caption: '<',
    data: '<',
    xAxis: '<',
    yAxis: '<',
    value: '<',
    displayName: '<',
    startIndex: '<',
    width: '<',
    height: '<',
    legendSize: '<',
    legendHeight: '<',
    legendWidth: '<',
    legendPadding: '<',
    legendOrient: '<'
  },
  controller: BarController,
  controllerAs: 'barCtrl',
  selector: 'barChart'
}
