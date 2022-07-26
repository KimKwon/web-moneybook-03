const { findAll } = require('../lib/query');

const StatisticService = {
  getStatistic: async (options) => {
    let { year, month } = options;
    const endDate = `${year}-${String(month).length === 1 ? '0' + month : month}`;
    if (month <= 6) {
      year = parseInt(year) - 1;
      month = 6 + parseInt(month);
    } else {
      month = parseInt(month) - 6;
    }

    const startDate = `${year}-${String(month).length === 1 ? '0' + month : month}`;

    const whereOptions = {
      date: ['BETWEEN', [startDate, endDate]],
    };

    const fields = ["DATE_FORMAT(date,'%Y-%m') as month", 'SUM(amount) as sum'];
    const order = { target: 'month' };
    try {
      const statistic = await findAll('account_history', {
        where: whereOptions,
        fields,
        group: 'month',
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
