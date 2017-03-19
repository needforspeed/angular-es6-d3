export default class FetchDataController {
  /* @ngInject */
  constructor($http) {
  	$http.get('/data.json')
  	.then(res => this.config = res.data);
  }	
}
