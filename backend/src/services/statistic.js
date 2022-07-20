const { find } = require("../lib/query");

const StatisticService = { 

   getStatistic : (params) => {
        const statistic = find('statistic', params)
        return statistic;
    },
}

module.exports = StatisticService;
