/**
 * Created by zyc on 2017/4/9.
 */

export default class BarsController {
  /* @ngInject */
  constructor($element, D3Factory, D3LegendFactory, Utils) {
    this.d3 = D3Factory;
    this.legend = D3LegendFactory;
    this.utils = Utils;

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

    const marginTop    = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.top)    : 0;
    const marginRight  = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.right)  : 0;
    const marginBottom = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.bottom) : 0;
    const marginLeft   = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.left)   : 0;

    const displayName = (this.options) ? this.utils.setString(this.options.displayName) : '';

    const width = this.width - marginLeft - marginRight;
    const height = this.height - marginTop - marginBottom;

    this.g
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    let x = this.d3.scaleBand()
      .range([0, width])
      .padding(0.5)
      .domain(this.data.map(d => d[this.key]));
    let y = this.d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, this.d3.max(this.data, d => d[this.value])]);

    let colors = this.d3.scaleOrdinal(this.d3.schemeCategory20);

    // bars
    this.g.selectAll(".bar")
      .data(this.data)
      .enter().append("rect")
        .attr("class", "bar")
        .attr("fill", d => colors(d[this.key]))
        .attr("x", d => x(d[this.key]))
        .attr("y", d => y(d[this.value]))
        .attr("width", x.bandwidth())
        .attr("height", d => height - y(d[this.value]));

    // xAxis
    this.g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0, ${height})`)
      .call(this.d3.axisBottom(x));

    // yAxis
    this.g.append("g")
        .attr("class", "axis axis-y")
      .call(this.d3.axisLeft(y))
      .append("text")
        .attr("transform", "rotate(-90)")
        .attr("y", 10)
        .attr("dy", "0.5em")
        .attr("text-anchor", "end")
        .attr("fill", "#000")
        .text(displayName.length ? displayName : this.value);
  }
}
