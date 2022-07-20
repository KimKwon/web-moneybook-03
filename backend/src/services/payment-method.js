const { find, create, deleteOne } = require("../lib/query");

const PaymentMethodService = { 

   getPaymentMethod : (params, order) => {
        //있는 필드인지 검사하고 매핑
        // const order = { } // 두개를 받는다. 기준 점, 오름차순 여부  
        const paymentMethod = find('paymentMethod', params, order )
        return paymentMethod;
    },


    createPaymentMethod : (paymentMethodMap) => {
        const paymentMethod = create('paymentMethod', paymentMethodMap )
        return paymentMethod;
    },

    deletePaymentMethod : (id, condition) => {
        const paymentMethod = deleteOne('paymentMethod',id, condition )
        return paymentMethod;
    }
}

module.exports = PaymentMethodService;
