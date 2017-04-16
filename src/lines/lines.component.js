/**
 * Created by zyc on 2017/4/22.
 */

import LinesController from './lines.controller';

export const LinesComponent = {
  bindings: {
    caption: '<',
    data: '<',
    key: '<',
    values: '<',
    width: '<',
    height: '<',
    options: '<'
  },
  controller: LinesController,
  controllerAs: 'linesCtrl',
  selector: 'linesChart'
}
