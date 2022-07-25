const { find, findAll } = require("../lib/query");

const AccountHistoryService = {
    getAccountHistory : async (options) => {

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


    createAccountHistory : (accountHistoryMap) => {
        //있는 필드인지 검사하고 매핑
        // const order = { } // 두개를 받는다. 기준 점, 오름차순 여부  
        const accountHistory = create('account-history',accountHistoryMap )
        return accountHistory;
    },


    updateAccountHistory : (id, accountHistoryMap) => {
        const accountHistory = updateOne('account-history',id,accountHistoryMap )
        return accountHistory;
    }
}

module.exports = AccountHistoryService;
