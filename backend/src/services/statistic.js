const { findAll } = require('../lib/query');
const { monthToString } = require('../utils/date');

const StatisticService = {
  getStatistic: async (options) => {
    let { year, month, categoryId, period } = options;
    period = parseInt(period);
    /* db에서 사이값 읽어오려면 month +1 해줘야 한다,  */
    if (month === 12) {
      year = parseInt(year) + 1;
      month = 1;
    } else {
      month = parseInt(month) + 1;
    }
    const endDate = `${year}-${monthToString(month)}`;
    console.log(month);
    if (month - period < 1) {
      year = +year - 1;
      month = period - (12 - month);
    } else {
      month = month - period;
    }
    console.log(month);
    const startDate = `${year}-${monthToString(month)}`;

    const whereOptions = {
      date: ['BETWEEN', [startDate, endDate]],

      is_profit: false,
      category_id: categoryId,
    };

    const fields = [' date', 'SUM(amount) as sum'];
    const order = { target: 'date' };
    try {
      const statistic = await findAll('account_history', {
        where: whereOptions,
        fields,
        group: 'date',
        order,
      });
      if (!statistic) return null;
      return statistic[0];
    } catch (error) {
      return null;
    }
  },
};

module.exports = StatisticService;
