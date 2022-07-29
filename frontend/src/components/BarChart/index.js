import './index.scss';
import Component from '@/lib/component';

class BarChart extends Component {
  constructor($target, initialState) {
    super($target, initialState);
  }

  rowTemplate(options) {
    const { row, rowInterval, width, className } = options;
    let template = '';
    for (let i = 0; i <= row; i++) {
      template += `
      <line x1="0" x2="${width}" y1="${rowInterval * i}" y2="${
        rowInterval * i
      }" class="${className}" stroke-width="1" />
      `;
    }
    return template;
  }

  columnTemplate(options) {
    const { column, columnInterval, height, className, split } = options;
    let template = '';
    for (let i = 0; i <= column * split; i++) {
      template += `
      <line x1="${(columnInterval / split) * i}" x2="${
        (columnInterval / split) * i
      }" y1="0" y2="${height}" class="${className}" stroke-width="1" />
      `;
    }
    return template;
  }

  circleTemplate(options) {
    const { data, columnInterval, height, rate, focusIndex, color, textColor } = options;
    const template = data
      .map((value, index) => {
        const x = columnInterval * (index + 1);
        let y = height - value * rate;
        if (y < 0) y = 0;
        return `<circle cx="${x}" cy="${y}" r="5" stroke="${color}" fill="${color}" stroke-width="3" data-idx="${index}"/>
          <text fill="${index !== focusIndex ? textColor : color}"  x="${x - 20}" y="${
          y - 25
        }" > ${Number(value).toLocaleString()}</text>`;
      })
      .join('');
    return template;
  }

  lineTemplate(options) {
    const { data, rowInterval, columnInterval, height, rate, className, color } = options;
    const len = data.length;
    const template = data
      .map((value, index) => {
        if (len - 1 === index) return;
        const x1 = columnInterval * (index + 1);
        const x2 = columnInterval * (index + 2);
        const y1 = height - value * rate;
        const y2 = height - data[index + 1] * rate;
        return `<path  d="M ${x1} ${y1} L ${x2} ${y2}" stroke="${color}"
        stroke-width="3" fill="none" />`;
      })
      .join('');
    return template;
  }

  labelTemplate(options) {
    const { labels, columnInterval, height, className } = options;
    const template = labels
      .map((label, index) => {
        return ` <text class="${className}" x="${columnInterval * (index + 1) - 10}" y="${
          height + 26
        }">${label}</text>`;
      })
      .join('');
    return template;
  }

  template() {
    const {
      data,
      labels,
      rowInterval,
      columnInterval,
      row,
      column,
      width,
      height,
      svgHeight,
      rate,
      split,
      color,
      focusIndex,
    } = this.chartInfo;
    /* html */ return `
    <?xml version="1.0" standalone="no"?>
    <svg width="${width}" height="${svgHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" stroke="none" fill="transparent" stroke-width="1"/>
      ${this.rowTemplate({ row, rowInterval, width, className: 'gray-light' })}
      ${this.columnTemplate({ column, columnInterval, height, className: 'gray-light', split })}
      ${this.lineTemplate({
        data,
        rowInterval,
        columnInterval,
        height,
        rate,
        color,
      })}
      ${this.circleTemplate({
        data,
        rowInterval,
        columnInterval,
        height,
        rate,
        focusIndex: focusIndex,
        color,
        textColor: '#888888',
      })}
      ${this.labelTemplate({ labels, columnInterval, height, className: 'gray' })}
      </svg>`;
  }

  render() {
    this.calculateChartData();
    const template = this.template();
    this.$target.innerHTML = template;
  }

  calculateChartData() {
    const { data, labels, width, height, row, split = 1, color, focusIndex } = this.state;
    const maxValue = Math.max(...data);
    const column = data.length + 1;
    const rowInterval = height / row;
    const columnInterval = width / column;
    const svgHeight = height + rowInterval;
    const rate = (rowInterval * (row - 1)) / maxValue;
    this.chartInfo = {
      color,
      data,
      labels,
      rowInterval,
      columnInterval,
      row,
      column,
      width,
      height,
      svgHeight,
      rate,
      split,
      focusIndex: focusIndex ? focusIndex : data.length - 1,
    };
  }
}

export default BarChart;
