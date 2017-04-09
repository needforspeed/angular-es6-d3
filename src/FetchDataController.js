export default class FetchDataController {
  /* @ngInject */
  constructor($http) {
  	$http.get('/pie.json')
  	  .then(res => this.pie = res.data);
  	$http.get('/donut.json')
      .then(res => this.donut = res.data);
  	$http.get('/bars.json')
      .then(res => this.bars = res.data);
  	$http.get('/stackedBars.json')
      .then(res => this.stackedBars = res.data);
  }	
}
