const StatisticService = require("../services/statistic");

const getStatistic = (req, res) => {
  StatisticService.getStatistic();
  res.status(200).send('결제수단이다~');
};

module.exports = { getStatistic };
