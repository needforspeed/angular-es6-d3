export default class PieController {
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

    this.tooltip = this.d3.select($element[0])
      .append('div')
      .attr('class', 'tooltip');
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

    const legendWidth   = (this.options && this.options.legend) ? this.utils.setNum(this.options.legend.width) : 0;
    const legendHeight  = (this.options && this.options.legend) ? this.utils.setNum(this.options.legend.height) : 0;
    const legendPadding = (this.options && this.options.legend) ? this.utils.setNum(this.options.legend.padding) : 0;
    const legendSize    = (this.options && this.options.legend) ? this.utils.setNum(this.options.legend.size) : 0;
    const innerRadius   = (this.options) ? this.utils.setNum(this.options.innerRadius) : 0;
    const displayName   = (this.options) ? this.utils.setString(this.options.displayName) : '';
    const legendOrient  = (this.options && this.options.legend) ? this.utils.setString(this.options.legend.orient) : '';

    this.g
      .attr('transform', `translate(${this.width / 2 + legendWidth}, ${this.height / 2 + legendHeight})`);

    const radius = Math.min(this.width, this.height) / 2;
    const color = this.d3.scaleOrdinal(this.d3.schemeCategory20);
    const pie = this.d3.pie()
      .sort(null)
      .value(d => d[this.value]);

    const path = this.d3.arc()
      .innerRadius(innerRadius)
      .outerRadius(radius);

    this.tooltip.append('div')
      .attr('class', 'label');

    this.tooltip.append('div')
      .attr('class', this.value);

    this.tooltip.append('div')
      .attr('class', 'percent');

    let arc = this.g.selectAll('.arc')
      .data(pie(this.data))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(displayName.length ? d.data[displayName] : d.data[this.key]));

    arc.on('mouseover', d => {
      let total = this.d3.sum(this.data.map(d => d[this.value]));
      let percent = Math.round(1000 * d.data[this.value] / total) / 10;
      this.tooltip.select('.label').html(displayName.length ? d.data[displayName] : d.data[this.key]);
      this.tooltip.select(`.${this.value}`).html(d.data[this.value]);
      this.tooltip.select('.percent').html(`${percent}%`);
      this.tooltip.style('display', 'block');
    });

    arc.on('mouseout', () => {
      this.tooltip.style('display', 'none');
    });

    // optional
    arc.on('mousemove', () => {
      this.tooltip.style('top', `${this.d3.event.layerY + 10}px`)
        .style('left', `${this.d3.event.layerX + 10}px`);
    });

    // legend
    this.svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(10,10)");

    let legendOrdinal = this.legend.legendColor()
      .scale(color);
    if(legendOrient.length) {
      legendOrdinal.orient(legendOrient);
    }
    if(legendPadding) {
      legendOrdinal.shapePadding(legendPadding);
    }
    if(legendSize) {
      legendOrdinal
        .shapeWidth(legendSize)
        .shapeHeight(legendSize);
    }

    this.svg.select(".legendOrdinal")
      .call(legendOrdinal);
  }
}

