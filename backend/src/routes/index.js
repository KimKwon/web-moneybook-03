const { Router } = require('express');
const StatisticRouter = require('./statistic');
const CategoryRouter = require('./category');
const PaymentMethodRouter = require('./payment-method');
const AccountHistoryRouter = require('./account-history');

const router = Router();

router.use('/statistic', StatisticRouter);
router.use('/category', CategoryRouter);
router.use('/payment-method', PaymentMethodRouter);
router.use('/account-history', AccountHistoryRouter);

module.exports = router;
