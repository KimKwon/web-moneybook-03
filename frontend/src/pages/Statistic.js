import AccountHitoryTable from '@/components/AccountHistoryTable/index';
import BarChartContainer from '@/components/BarChartContainer/index';
import DonutChartContainer from '@/components/DonutChartContainer/index';
import Header from '@/components/Header/index';
import Loader from '@/components/Loader/index';
import { SELECTOR_MAP } from '@/constants/selector-map';
import { getAccountHistory } from '@/lib/api/accountHistory';

import store from '@/store/index';
import { getStartAndEndDate, groupByDate } from '@/utils/date';

class Statistic {
  constructor($target) {
    this.$target = $target;
    this.$header = $target.querySelector('header');
    this.$main = $target.querySelector('main');
    this.state = {};
    this.init();
  }

  createStatisticTemplate() {
    this.$main.innerHTML = '';
    this.$main.appendChild(this.$donutChartContainer);
    this.$main.appendChild(this.$barChartContainer);
    this.$main.appendChild(this.$acountHistoryTableContainer);
  }

  init() {
    store.cleanupListener(SELECTOR_MAP.CURRENT_DATE);
    store.cleanupListener(SELECTOR_MAP.ACCOUNT_HISTORY);

    this.$donutChartContainer = document.createElement('div');
    this.$barChartContainer = document.createElement('div');
    this.$acountHistoryTableContainer = document.createElement('div');

    new Header(this.$header);
    this.createStatisticTemplate();

    store.subscribe(SELECTOR_MAP.CURRENT_DATE, this.setCurrentDate.bind(this));
    store.subscribe(SELECTOR_MAP.IS_LOADING, () => {
      Loader.showLoader(this.$main);
      if (store.getState(SELECTOR_MAP.IS_LOADING) === false) {
        this.createStatisticTemplate();
      }
    });
    this.setCurrentDate();
  }

  barChartRender() {
    const { categoryId, categoryName, currentDate } = this.state;
    const { month, year } = currentDate;
    if (!categoryId) return;
    const initialState = { month, year, categoryId, categoryName, period: 6 };
    this.$barChart = new BarChartContainer(this.$barChartContainer, initialState);
  }

  async accountHistoryTableRender() {
    const { categoryId } = this.state;
    if (!categoryId) return;
    const accountHistoryData = await getAccountHistory({
      ...getStartAndEndDate(new Date()),
      categoryId: categoryId,
      type: 'expenditure',
    });
    const accountHistoryByDate = groupByDate(accountHistoryData);
    this.$accountHistoryTable = new AccountHitoryTable(this.$acountHistoryTableContainer, {
      accountHistoryByDate: accountHistoryByDate,
    });
  }

  donutChartRender() {
    const { year, month } = this.state.currentDate;
    this.$donutChartContainer.innerHTML = '';
    this.$donutChart = new DonutChartContainer(
      this.$donutChartContainer,
      { year, month },
      this.changeCategory.bind(this),
    );
    this.$barChartContainer.innerHTML = '';
    this.$acountHistoryTableContainer.innerHTML = '';
  }

  changeCategory({ categoryId, categoryName }) {
    this.setState({ categoryId, categoryName });
  }

  setState(nextState) {
    const { currentDate, categoryId, categoryName } = nextState;

    if (currentDate) {
      this.state['currentDate'] = currentDate;
      this.donutChartRender();
    }
    if (categoryId) {
      this.state = {
        ...this.state,
        categoryId,
        categoryName,
      };
      if (this.$barChart) {
        this.$barChart.setState({ categoryId, categoryName });
      } else {
        this.barChartRender();
      }
      this.accountHistoryTableRender();
    }
  }

  setCurrentDate() {
    const currentDate = store.getState(SELECTOR_MAP.CURRENT_DATE);
    this.setState({ currentDate });
  }
}

export default Statistic;
