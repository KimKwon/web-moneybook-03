import './index.scss';

import Component from '@/lib/component';

import fileTextIcon from '@/assets/icon/file-text.svg';
import calendarIcon from '@/assets/icon/calendar.svg';
import chartIcon from '@/assets/icon/chart.svg';
//import leftArrowIcon from '../assets/icon/left-arrow.svg';
//import rightArrowIcon from '../assets/icon/right-arrow.svg';

export default class Header extends Component {
  constructor($target, initialState) {
    super($target);
    this.$target = $target;
    this.state = initialState || {};
    this.init();
    this.render();
    this.didMount();
  }

  init() {}

  didMount() {}

  setState(nextState) {
    this.state = { ...this.state, ...nextState };
    this.render();
  }

  template() {
    const { year, month } = this.state;
    return `
     <div class="header">
        <a is="my-anchor" href="/" class="nav-item">우아한 가계부</a> 
        <div class="month-controller">
          <button class="month-controller__prev">${`<`}</button>
          <div>
            <div>${month}</div>
            <div>${year}</div>
          </div> 
          <button class="month-controller__next">${`>`}</button>
        </div>
        <div class='nav'>
          <a class="nav-main" is="my-anchor" href="/">y</a> 
          <a class="nav-calendar" is="my-anchor" href="/calendar">y</a>
          <a class="nav-statistic" is="my-anchor" href="/statistic">y</a>
        </div>
      </div>
    `;
  }
  render() {
    const template = this.template();
    app.innerHTML = template;
  }
}
