const { findAll } = require('../lib/query');
const { calculateVaildDate } = require('../utils/date');

const StatisticService = {
  getStatistic: async (options) => {
    let { year, month, categoryId, period } = options;

    const { startDate, endDate } = calculateVaildDate(month, year, period);

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
