export default class PieController {
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

    this.tooltip = this.d3.select($element[0])
      .append('div')
      .attr('class', 'tooltip');
  }

  $onInit() {
    console.log(this.caption);
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

    this.g
      .attr('transform',
        `translate(${this.width / 2 + (this.legendWidth ? this.legendWidth : 0)}, ${this.height / 2 + (this.legendHeight ? this.legendHeight : 0)})`);

    const radius = Math.min(this.width, this.height) / 2;
    const color = this.d3.scaleOrdinal(this.d3.schemeCategory20);
    const pie = this.d3.pie()
      .sort(null)
      .value(d => d[this.value]);

    const path = this.d3.arc()
      .innerRadius(this.innerRadius)
      .outerRadius(radius);

    this.tooltip.append('div')
      .attr('class', 'label');

    this.tooltip.append('div')
      .attr('class', this.value);

    this.tooltip.append('div')
      .attr('class', 'percent');

    const jsonData = this.data.slice(this.startIndex !== undefined ? this.startIndex : 0);

    let arc = this.g.selectAll('.arc')
      .data(pie(jsonData))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(this.displayName ? d.data[this.displayName] : d.data[this.key]));

    arc.on('mouseover', d => {
      let total = this.d3.sum(jsonData.map(d => d[this.value]));
      let percent = Math.round(1000 * d.data[this.value] / total) / 10;
      this.tooltip.select('.label').html(this.displayName ? d.data[this.displayName] : d.data[this.key]);
      this.tooltip.select(`.${this.value}`).html(d.data[this.value]);
      this.tooltip.select('.percent').html(`${percent}%`);
      this.tooltip.style('display', 'block');
    });

    arc.on('mouseout', () => {
      this.tooltip.style('display', 'none');
    });

    // optional
    arc.on('mousemove', () => {
      // console.log(`x: ${this.d3.event.layerX + 10}px, y: ${this.d3.event.layerY + 10}px`);
      this.tooltip.style('top', `${this.d3.event.layerY + 10}px`)
        .style('left', `${this.d3.event.layerX + 10}px`);
    });

    // legend
    this.svg.append("g")
      .attr("class", "legendOrdinal")
      .attr("transform", "translate(10,10)");

    let legendOrdinal = this.legend.legendColor()
      .scale(color);
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

    this.svg.select(".legendOrdinal")
      .call(legendOrdinal);
  }
}

