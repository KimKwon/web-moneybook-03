const { find } = require("../lib/query");

const AccountHistoryService = { 

   getAccountHistory : (params, order) => {
        //있는 필드인지 검사하고 매핑
        // const order = { } // 두개를 받는다. 기준 점, 오름차순 여부  
        const accountHistory = find('account-history', params, order )
        return accountHistory;
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
