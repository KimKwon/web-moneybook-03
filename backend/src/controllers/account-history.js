const AccountHistoryService = require("../services/account-history");


const getAccountHistory = async (req, res) => {
  const result = await AccountHistoryService.getAccountHistory(req.query);

  if (!result) {
    res.status(500).send('서버가 잘못했어요');
  }

  res.status(200).json(result);
};

const createAccountHistory = (req, res) => {
  AccountHistoryService.createAccountHistory();
  res.status(200).send('결제수단이다~');
};

const updateAccountHistory = (req, res) => {
  AccountHistoryService.updateAccountHistory();
  res.status(200).send('결제수단이다~');
};

module.exports = { getAccountHistory, createAccountHistory, updateAccountHistory };
