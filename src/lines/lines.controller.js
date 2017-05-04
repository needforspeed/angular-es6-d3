/**
 * Created by zyc on 2017/4/22.
 */

export default class LinesController {
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

    const displayNames = (this.options) ? this.utils.setArray(this.options.displayNames) : [];

    const width = this.width - marginLeft - marginRight;
    const height = this.height - marginTop - marginBottom;

    this.g
      .attr("transform", `translate(${marginLeft}, ${marginTop})`);

    const parseTime = this.d3.timeParse("%Y-%m-%d");
    const data = this.values.map((id, idx) => {
      return {
        key: id,
        displayName: typeof displayNames[idx] !== 'undefined' ? displayNames[idx]: id,
        values: this.data.map(d => {
          return {date: parseTime(d[this.key]), value: d[id]};
        })
      };
    });

    let x = this.d3.scaleTime().range([0, width]);
    let y = this.d3.scaleLinear().range([height, 0]);
    let colors = this.d3.scaleOrdinal(this.d3.schemeCategory20);

    x.domain(this.d3.extent(this.data, d => parseTime(d[this.key])));
    y.domain([
      this.d3.min(this.data, d => {
        let m = d[this.values[0]];
        this.values.forEach(v => m = d[v] > m ? m : d[v]);
        return m;
      }),
      this.d3.max(this.data, d => {
        let m = d[this.values[0]];
        this.values.forEach(v => m = d[v] < m ? m : d[v]);
        return m;
      })
    ]);
    colors.domain(this.values);

    this.g.append("g")
      .attr("class", "axis axis-x")
      .attr("transform", `translate(0, ${height})`)
      .call(this.d3.axisBottom(x));

    this.g.append("g")
      .attr("class", "axis axis-y")
      .call(this.d3.axisLeft(y))
      .append("text")
      .attr("transform", "rotate(-90)")
      .attr("y", 6)
      .attr("dy", "0.71em")
      .attr("fill", "#000")
      .text("Values");


    const line = this.d3.line()
      .curve(this.d3.curveBasis)
      .x(d => x(d.date))
      .y(d => y(d.value));

    let lines = this.g.selectAll(".line")
      .data(data)
      .enter().append("g")
        .attr("class", "line");

    lines.append("path")
        .attr("class", "line")
        .attr("d", d => line(d.values))
        .style("stroke", d => colors(d.key));

    lines.append("text")
        .datum(d => {
          return {id: d.displayName, value: d.values[d.values.length - 1]};
        })
        .attr("transform", d => `translate(${x(d.value.date)}, ${y(d.value.value)})`)
        .attr("x", 3)
        .attr("dy", "0.35em")
        .style("font", "10px sans-serif")
        .text(d => d.id);

  }
}
