const AccountHistoryService = require('../services/account-history');

const getAccountHistory = async (req, res) => {
  const result = await AccountHistoryService.getAccountHistory(req.query);

  if (!result) {
    res.status(500).send('서버가 잘못했어요');
  }

  res.status(200).json(result);
};

const createAccountHistory = async (req, res) => {
  if (!req.body) res.status(400).send('body가 비어있어요.');

  const { categoryId, paymentMethodId, isProfit, ...rest } = req.body;

  const result = await AccountHistoryService.createAccountHistory({
    ...rest,
    user_id: 'star',
    category_id: categoryId,
    payment_method_id: paymentMethodId,
    is_profit: isProfit,
  });

  console.log(result);

  res.status(200).json(result);
};

const updateAccountHistory = (req, res) => {
  AccountHistoryService.updateAccountHistory();
  res.status(200).send('결제수단이다~');
};

module.exports = { getAccountHistory, createAccountHistory, updateAccountHistory };
