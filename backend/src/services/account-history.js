const { create, findAll, updateOne } = require('../lib/query');
const { ACCOUNT_HISTORY_DBMODEL } = require('../constants/model');
const { getValidDbMap, getDbFields } = require('../utils/db');

const AccountHistoryService = {
  getAccountHistory: async (options) => {
    try {
      const { startDate, endDate, categoryId, type } = options;

      const whereOptions = {
        date: ['BETWEEN', [startDate, endDate]],
      };

      if (categoryId) {
        whereOptions['category.id'] = categoryId;
      }

      if (type) {
        whereOptions['account_history.is_profit'] = type === 'income';
      }

      const accountHistory = await findAll('account_history', {
        joinOptions: {
          table: [
            ['payment_method', 'payment_method_id'],
            ['category', 'category_id'],
            ['users', 'user_id'],
          ],
        },
        where: whereOptions,
        fields: [
          'account_history.id',
          "date_format(account_history.date, '%Y-%m-%d') as date",
          'account_history.content',
          'account_history.amount',
          'account_history.is_profit as isProfit',
          'payment_method.name as methodName',
          'payment_method.id as methodId',
          'category.name as categoryName',
          'category.id as categoryId',
        ],
      });

      if (!accountHistory) return null;

      return accountHistory[0];
    } catch (error) {
      return null;
    }
  },

  createAccountHistory: (requestData) => {
    const validMap = getValidDbMap(ACCOUNT_HISTORY_DBMODEL, requestData);
    const fields = getDbFields(ACCOUNT_HISTORY_DBMODEL);
    const options = { createMap: validMap, fields };
    const accountHistory = create('account_history', options);
    return accountHistory;
  },

  updateAccountHistory: (id, requestData) => {
    const validMap = getValidDbMap(ACCOUNT_HISTORY_DBMODEL, requestData);
    const fields = getDbFields(ACCOUNT_HISTORY_DBMODEL);
    const options = { condition: { id }, updateMap: validMap, fields };
    const accountHistory = updateOne('account_history', options);
    return accountHistory;
  },
};

module.exports = AccountHistoryService;
