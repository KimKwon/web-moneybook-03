const AccountHistoryService = require("../services/account-history");


const getAccountHistory = (req, res) => {
  AccountHistoryService.getAccountHistory();
  res.status(200).send('결제수단이다~');
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
