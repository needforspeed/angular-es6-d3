/**
 * Created by zyc on 2017/4/9.
 */

export default class StackedBarsController {
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

    const width = this.width - this.margin.left - this.margin.right;
    const height = this.height - this.margin.top - this.margin.bottom;

    this.g
      .attr('transform', `translate(${this.margin.left}, ${this.margin.top})`);

    let x = this.d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.5);

    let y = this.d3.scaleLinear()
      .rangeRound([height, 0]);
    let z = this.d3.scaleOrdinal(this.d3.schemeCategory20);

    const jsonData = this.data.slice(this.startIndex !== undefined ? this.startIndex : 0);
    jsonData.forEach(d => {
      d.total = 0;
      this.keys.forEach(k => {
        d.total += d[k]
      })
    });

    // jsonData.sort((a, b) => b.total - a.total);
    x.domain(jsonData.map(d => d[this.group]));
    y.domain([0, this.d3.max(jsonData, d => d.total)]).nice();
    z.domain(this.keys);

    this.g.append("g")
      .selectAll("g")
      .data(this.d3.stack().keys(this.keys)(jsonData))
      .enter().append("g")
        .attr("fill", d => z(d.key))
      .selectAll("rect")
      .data(d => d)
      .enter().append("rect")
        .attr("x", d => x(d.data[this.group]))
        .attr("y", d => y(d[1]))
        .attr("height", d => y(d[0]) - y(d[1]))
        .attr("width", x.bandwidth());

    // xAxis
    this.g.append("g")
        .attr("class", "axis")
        .attr("transform", `translate(0, ${height})`)
        .call(this.d3.axisBottom(x));

    // yAxis
    this.g.append("g")
        .attr("class", "axis")
        .call(this.d3.axisLeft(y).ticks(null, "s"))
      .append("text")
        .attr("x", 2)
        .attr("y", y(y.ticks().pop()) + 0.5)
        .attr("dy", "0.32em")
        .attr("fill", "#000")
        .attr("font-weight", "bold")
        .attr("text-anchor", "start")
        .text("Population");

    // legend
    this.g.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", `translate(${this.margin.left}, ${this.margin.top})`);

    let legendOrdinal = this.legend.legendColor()
      .scale(z);
    if(this.legendOrient) {
      legendOrdinal.orient(this.legendOrient);
    }
    if(this.legendPadding) {
      legendOrdinal.shapePadding(this.legendPadding);
    }
    if(this.legendSize) {
      legendOrdinal
        .shapeWidth(this.legendSize)
        .shapeHeight(this.legendSize);
    }

    this.g.select(".legendOrdinal")
      .call(legendOrdinal);
  }
}
