const { Router } = require('express');
const { getStatistic } = require('../controllers/statistic');

const router = Router();

router.get('/', getStatistic);

module.exports = router;
