export default class PieController {
  /* @ngInject */
  constructor($element) {
    this.name = 'Pie';

    this.svg = d3.select($element[0])
      .append('svg');

    this.g = this.svg.append('g');

    this.tooltip = d3.select($element[0])
      .append('div')
      .attr('class', 'tooltip');
  }

  $onChanges(change) {
    if(!change.data.currentValue) {
      return;
    }

    this.svg
      .attr('width', this.width)
      .attr('height', this.height);

    this.g
      .attr('transform', `translate(${this.width / 2}, ${this.height / 2})`);

    const radius = Math.min(this.width, this.height) / 2;
    const color = d3.scaleOrdinal(d3.schemeCategory20);
    const pie = d3.pie()
      .sort(null)
      .value(d => d[this.value]);

    const path = d3.arc()
      .innerRadius(50)
      .outerRadius(radius - 50);

    this.tooltip.append('div')
      .attr('class', 'label');

    this.tooltip.append('div')
      .attr('class', this.value);

    this.tooltip.append('div')
      .attr('class', 'percent');


    const jsonData = angular.copy(this.data);

    let arc = this.g.selectAll('.arc')
      .data(pie(jsonData))
      .enter().append('g')
      .attr('class', 'arc');

    arc.append('path')
      .attr('d', path)
      .attr('fill', d => color(d.data[this.key]));

    arc.on('mouseover', d => {
      let total = d3.sum(jsonData.map(d => d[this.value]));
      let percent = Math.round(1000 * d.data[this.value] / total) / 10;
      this.tooltip.select('.label').html(d.data[this.key]);
      this.tooltip.select(`.${this.value}`).html(d.data[this.value]);
      this.tooltip.select('.percent').html(`${percent}%`);
      this.tooltip.style('display', 'block');
    });

    arc.on('mouseout', () => {
      this.tooltip.style('display', 'none');
    });

    // optional
    arc.on('mousemove', () => {
      this.tooltip.style('top', (d3.event.layerY + 10) + 'px')
        .style('left', (d3.event.layerX + 10) + 'px');
    });
  }
}

