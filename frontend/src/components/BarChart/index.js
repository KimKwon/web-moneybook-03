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
    const { data, columnInterval, rowInterval, height, rate, circleClass, textClass, focusIndex } =
      options;
    const [defaultCircle, focusCircle] = circleClass;
    const [defaultText, focusText] = textClass;
    const template = data
      .map((value, index) => {
        const x = columnInterval * (index + 1);
        let y = -rowInterval + height - value * rate;
        if (y < 0) y = 0;
        return `<circle cx="${x}" cy="${y}" r="5" class="${
          index !== focusIndex ? defaultCircle : focusCircle
        }" stroke-width="5" data-idx="${index}"/>
          <text class="${index !== focusIndex ? defaultText : focusText}"  x="${x - 20}" y="${
          y - 25
        }" > ${Number(value).toLocaleString()}</text>`;
      })
      .join('');
    return template;
  }

  lineTemplate(options) {
    const { data, rowInterval, columnInterval, height, rate, className } = options;
    const len = data.length;
    const template = data
      .map((value, index) => {
        if (len - 1 === index) return;
        const x1 = columnInterval * (index + 1);
        const x2 = columnInterval * (index + 2);
        const y1 = -rowInterval + height - value * rate;
        const y2 = -rowInterval + height - data[index + 1] * rate;
        return ` <line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" class="${className}" stroke-width="2"/>`;
      })
      .join('');
    return template;
  }
  labelTemplate(options) {
    const { labels, columnInterval, height, className } = options;
    const template = labels
      .map((label, index) => {
        return ` <text class="${className}" x="${columnInterval * (index + 1) - 10}" y="${
          height + 20
        }">${label}</text>`;
      })
      .join('');
    return template;
  }
  styleTemplate() {
    return /* html */ `
      <style>
        .gray-light{
          fill : #dddddd;
          stroke: #dddddd
        }
        .gray{
          fill : #8D9393;
          stroke: #8D9393
        }
        .gray-dark{
          fill : #626666;
          stroke: #626666;
        }
        .primary{
          fill :#2ac1bc;
          stroke :#2ac1bc;
        }
        .primary-light{
          fill :#A0E1E0;
          stroke :#A0E1E0;
        }
        .primary-dark{
          fill :#219A95;
          stroke :#219A95;
        }
        circle:hover{
          fill :#219A95;
          stroke :#219A95;
        }
      </style>`;
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
    } = this.chartInfo;
    /* html */ return `
    <?xml version="1.0" standalone="no"?>
    <svg width="${width}" height="${svgHeight}" version="1.1" xmlns="http://www.w3.org/2000/svg">
      <rect x="0" y="0" width="100%" height="100%" stroke="none" fill="transparent" stroke-width="1"/>
      ${this.styleTemplate()}
      ${this.rowTemplate({ row, rowInterval, width, className: 'gray-light' })}
      ${this.columnTemplate({ column, columnInterval, height, className: 'gray-light', split })}
      ${this.lineTemplate({
        data,
        rowInterval,
        columnInterval,
        height,
        rate,
        className: 'primary-light',
      })}
      ${this.circleTemplate({
        data,
        rowInterval,
        columnInterval,
        height,
        rate,
        circleClass: ['primary', 'primary-dark'],
        textClass: ['gray', 'primary-dark'],
        focusIndex: data.length - 1,
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
    const { data, labels, width, height, row, split = 1 } = this.state;
    const maxValue = Math.max(...data);
    const column = data.length + 1;
    const rowInterval = height / row;
    const columnInterval = width / column;
    const svgHeight = height + rowInterval;
    const rate = (rowInterval * (row - 2)) / maxValue;
    this.chartInfo = {
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
    };
  }
}

export default BarChart;
