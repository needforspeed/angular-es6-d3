import PieController from './pie.controller';

export const PieComponent = {
  bindings: {
    caption: '<',
    data: '<',
    key: '<',
    value: '<',
    options: '<',
    width: '<',
    height: '<'
  },
  controller: PieController,
  controllerAs: 'pieCtrl',
  selector: 'pieChart'
}
