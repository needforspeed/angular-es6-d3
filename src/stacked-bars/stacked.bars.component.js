/**
 * Created by zyc on 2017/4/9.
 */

import StackedBarsController from './stacked.bars.controller';

export const StackedBarsComponent = {
  bindings: {
    caption: '<',
    width: '<',
    height: '<',
    data: '<',
    keys: '<',
    group: '<',
    options: '<'
  },
  controller: StackedBarsController,
  controllerAs: 'stackedBarsCtrl',
  selector: 'stackedBarsChart'
}
