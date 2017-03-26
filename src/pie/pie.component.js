import PieController from './pie.controller';

export const PieComponent = {
  bindings: {
    caption: '<',
    data: '<',
    key: '<',
    value: '<',
    width: '<',
    height: '<',
    iradius: '<',
    lsize: '<',
    lheight: '<',
    lwidth: '<',
    lpadding: '<',
    lorient: '<'
  },
  controller: PieController,
  controllerAs: 'pieCtrl',
  selector: 'pieChart'
}
