const AccountHistoryService = require('../services/account-history');

const getAccountHistory = async (req, res) => {
  const result = await AccountHistoryService.getAccountHistory(req.query);
  if (!result) {
    return res.status(500).send('server error');
  }

  res.status(200).json(result);
};

const createAccountHistory = async (req, res) => {
  const result = await AccountHistoryService.createAccountHistory(req.body);
  if (!result) {
    return res.status(500).send('server error');
  }
  res.status(200).send(result);
};

const updateAccountHistory = async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).send('server error');
  const result = await AccountHistoryService.updateAccountHistory(id, req.body);
  if (!result) {
    return res.status(500).send('server error');
  }
  res.status(200).send(result);
};

module.exports = { getAccountHistory, createAccountHistory, updateAccountHistory };
