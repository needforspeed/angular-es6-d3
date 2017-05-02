/**
 * Created by zyc on 2017/4/9.
 */

export default class StackedBarsController {
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

    const marginTop    = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.top) : 0;
    const marginRight  = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.right) : 0;
    const marginBottom = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.bottom) : 0;
    const marginLeft   = (this.options && this.options.margin) ? this.utils.setNum(this.options.margin.left) : 0;

    const width = this.width - marginLeft - marginRight;
    const height = this.height - marginTop - marginBottom;

    this.g
      .attr('transform', `translate(${marginLeft}, ${marginTop})`);

    this.data.forEach(d => {
      d.total = 0;
      this.keys.forEach(k => d.total += d[k])
    });

    if(this.options && this.options.sort && this.options.sort === 'asc') {
      this.data.sort((a, b) => a.total - b.total);
    } else if(this.options && this.options.sort && this.options.sort === 'desc') {
      this.data.sort((a, b) => b.total - a.total);
    }

    let x = this.d3.scaleBand()
      .rangeRound([0, width])
      .paddingInner(0.5)
      .domain(this.data.map(d => d[this.group]));

    let y = this.d3.scaleLinear()
      .rangeRound([height, 0])
      .domain([0, this.d3.max(this.data, d => d.total)]).nice();

    let colors = this.d3.scaleOrdinal(this.d3.schemeCategory20)
      .domain(this.keys);

    // stacked bars
    this.g.append("g")
      .selectAll("g")
      .data(this.d3.stack().keys(this.keys)(this.data))
      .enter().append("g")
        .attr("fill", d => colors(d.key))
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
        .attr("dy", "0.5em")
        .attr("fill", "#000")
        .attr("text-anchor", "start")
        .text("Total");

    // legend
    this.g.append("g")
        .attr("class", "legendOrdinal")
        .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    let legendOrdinal = this.legend.legendColor()
      .scale(colors);
    if(this.options.legendOrient) {
      legendOrdinal.orient(this.options.legendOrient);
    }
    if(this.options.legendPadding) {
      legendOrdinal.shapePadding(this.options.legendPadding);
    }
    if(this.options.legendSize) {
      legendOrdinal
        .shapeWidth(this.options.legendSize)
        .shapeHeight(this.options.legendSize);
    }

    this.g.select(".legendOrdinal")
      .call(legendOrdinal);
  }
}
