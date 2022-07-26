class BarChart {
  constructor(options) {
    const { values, interval } = options;
    this.values = values;
    this.interval = interval;
    this.init();
  }

  init() {
    //
    this.Linterval = 60;
    this.interval = 60;
    this.row = 8;
    this.column = 14;
    this.width = this.interval * this.column;
    this.height = this.interval * (this.row + 1);
    this.values = [100000, 233000, 160000, 140000, 70000, 150400];
    this.maxValue = Math.max(...this.values);
    this.myInterval = this.maxValue / this.row - 2;
    this.rate = this.interval / this.myInterval;
  }
  rowLineTemplate = (row, interval, width) => {
    let template = '';
    for (let i = 0; i <= row; i++) {
      template += `
      <line x1="0" x2="${width}" y1="${interval * i}" y2="${
        interval * i
      }" stroke="#cccccc" stroke-width="1" />
      `;
    }
    return template;
  };
  columnTemplate = (column, interval, height) => {
    let template = '';
    for (let i = 0; i <= column; i++) {
      template += `
      <line x1="${interval * i}" x2="${
        interval * i
      }" y1="0" y2="${height}" stroke="#cccccc" stroke-width="1" />
      `;
    }
    return template;
  };

  circleTemplate = () => {
    const template = this.values
      .map((value, index) => {
        const x = this.interval * 2 * (index + 1);
        let y = this.interval + this.height - value * this.rate; // * (interval / myInterval); //height - value; /// myInterval; /// myInterval;
        if (y < 0) y = 0;
        return `<circle cx="${x}" cy="${y}" r="5"  fill="#2ac1bc" stroke-width="5" data-idx="${index}"/>
          <text class="gray-dark" x="${x - 20}" y="${y - 25}" > ${Number(
          value,
        ).toLocaleString()}</text>`;
      })
      .join('');
    console.log(template);
    return template;
  };

  lineTemplate = () => {
    const template = this.values
      .map((value, index) => {
        if (this.values.length - 1 === index) return;
        const x1 = this.interval * 2 * (index + 1);
        const x2 = this.interval * 2 * (index + 2);
        const y1 = this.Linterval + this.height - value * this.rate;
        const y2 = this.Linterval + this.height - this.values[index + 1] * this.rate;
        return ` <line x1="${x1}" x2="${x2}" y1="${y1}" y2="${y2}" stroke="#2ac1bc" stroke-width="2"/>`;
      })
      .join('');
    return template;
  };
  keyTemplate = () => {
    const month = ['1월', '2월', '3월', '4월', '5월', '6월 '];
    const template = month
      .map((value, index) => {
        return ` <text class="gray" x="${this.interval * 2 * (index + 1) - 10}" y="${
          this.height + 20
        }">${value}</text>`;
      })
      .join('');
    console.log(template);
    return template;
  };

  template = () => {
    /* html */
    return `
  <?xml version="1.0" standalone="no"?>
  <svg width="${this.width}" height="${
      this.height + this.Linterval
    }" version="1.1" xmlns="http://www.w3.org/2000/svg">
    <style>
      .small{
        fill : #666666
      }
      .gray{
        fill : #999
      }
      .gray-dark{
        fill : #666
      }
      .primary{
        fill :#2ac1bc;
      }
    </style>
    ${this.rowLineTemplate(this.row, this.interval, this.width)}
    ${this.columnTemplate(this.column, this.interval, this.height)}
    ${this.circleTemplate()}
    ${this.lineTemplate()}
    ${this.keyTemplate()}
    <rect x="0" y="0" width="100%" height="100%" stroke="none" fill="transparent" stroke-width="1"/>
  </svg>`;
  };
}

/*${circleTemplate(this.interval * 2)}
${lineTemplate(this.interval * 2)}
${keyTemplate(this.interval * 2)}
  ${this.lineTemplate(this.interval * 2)}

*/

export default BarChart;
