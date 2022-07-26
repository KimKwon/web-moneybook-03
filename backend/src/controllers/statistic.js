const StatisticService = require('../services/statistic');

const getStatistic = async (req, res) => {
  const { year, month } = req.query;
  const result = await StatisticService.getStatistic({ year, month });
  if (!result) {
    return res.status(500).send('server error');
  }
  res.status(200).json(result);
};

module.exports = { getStatistic };
