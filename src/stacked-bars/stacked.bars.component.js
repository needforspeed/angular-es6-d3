/**
 * Created by zyc on 2017/4/9.
 */

import StackedBarsController from './stacked.bars.controller';

export const StackedBarsComponent = {
  bindings: {
    caption: '<',
    margin: '<',
    data: '<',
    group: '<',
    keys: '<',
    values: '<',
    displayNames: '<',
    startIndex: '<',
    width: '<',
    height: '<',
    legendSize: '<',
    legendPadding: '<',
    legendOrient: '<'
  },
  controller: StackedBarsController,
  controllerAs: 'stackedBarsCtrl',
  selector: 'stackedBarsChart'
}
