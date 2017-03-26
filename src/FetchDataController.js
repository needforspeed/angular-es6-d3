export default class FetchDataController {
  /* @ngInject */
  constructor($http) {
  	$http.get('/pie.json')
  	  .then(res => this.pie = res.data);
  	$http.get('/donut.json')
      .then(res => this.donut = res.data);
  }	
}
