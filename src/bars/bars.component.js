/**
 * Created by zyc on 2017/4/9.
 */

import BarsController from './bars.controller';

export const BarsComponent = {
  bindings: {
    caption: '<',
    data: '<',
    key: '<',
    value: '<',
    width: '<',
    height: '<',
    options: '<'
  },
  controller: BarsController,
  controllerAs: 'barsCtrl',
  selector: 'barsChart'
}
