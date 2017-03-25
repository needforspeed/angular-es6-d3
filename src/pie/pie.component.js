import PieController from './pie.controller';
import template from './pie.html';

export const PieComponent = {
  bindings: {
    data: '<',
    key: '<',
    value: '<',
    width: '<',
    height: '<',
    iradius: '<'
  },
  controller: PieController,
  controllerAs: 'pieCtrl',
  selector: 'pieChart',
  template
}
