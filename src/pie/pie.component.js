import PieController from './pie.controller';

export const PieComponent = {
  bindings: {
    caption: '<',
    data: '<',
    key: '<',
    value: '<',
    displayName: '<',
    startIndex: '<',
    width: '<',
    height: '<',
    innerRadius: '<',
    legendSize: '<',
    legendHeight: '<',
    legendWidth: '<',
    legendPadding: '<',
    legendOrient: '<'
  },
  controller: PieController,
  controllerAs: 'pieCtrl',
  selector: 'pieChart'
}
