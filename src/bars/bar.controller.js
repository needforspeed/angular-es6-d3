/**
 * Created by zyc on 2017/4/9.
 */

export default class BarController {
  /* @ngInject */
  constructor($element, D3Factory, D3LegendFactory) {
    this.d3 = D3Factory;
    this.legend = D3LegendFactory;

    let figure = this.d3.select($element[0])
      .append('figure');

    this.figcaption = figure
      .append('figcaption');

    this.svg = figure
      .append('svg');

    this.g = this.svg.append('g');
  }

  $onChanges(change) {
    if(!change.data.currentValue) {
      return;
    }

    this.figcaption
      .text(this.caption)
      .attr('class', 'text-center');

    this.svg
      .attr('width', this.width)
      .attr('height', this.height);

    const	parseDate = this.d3.isoParse;

    let x = this.d3.scaleBand().rangeRound([0, this.width]).padding(.05);
    let y = this.d3.scaleLinear().range([this.height, 0]);

    let xAxis = this.d3.axisBottom(x)
      // .tickFormat(this.d3.time.format("%Y-%m"));
console.log(xAxis);

    let yAxis = this.d3.axisLeft(y)
      // .ticks(10);
console.log(yAxis);

    const jsonData = this.data.slice(this.startIndex !== undefined ? this.startIndex : 0);

    for(let d of jsonData) {
      d.date = parseDate(d.ts);
    }
console.log(jsonData);
    x.domain(jsonData.map(d => d.date));

  }
}
