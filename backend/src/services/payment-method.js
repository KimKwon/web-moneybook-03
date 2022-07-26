const { create, deleteOne, findAll } = require('../lib/query');
const { PAYMENT_METHOD_DBMODEL } = require('../constants/model');
const { getValidDbMap, getDbFields } = require('../utils/db');
const PaymentMethodService = {
  getPaymentMethod: async () => {
    try {
      const paymentMethod = await findAll('payment_method', {
        fields: ['id', 'name', 'is_delete as isDelete'],
      });
      if (!paymentMethod) return null;

      return paymentMethod[0];
    } catch (error) {
      return null;
    }
  },

  createPaymentMethod: async (requestData) => {
    const validMap = getValidDbMap(PAYMENT_METHOD_DBMODEL, requestData);
    const fields = getDbFields(PAYMENT_METHOD_DBMODEL);
    const options = { createMap: validMap, fields };
    const accountHistory = create('payment_method', options);
    return accountHistory;
  },

  deletePaymentMethod: async (id) => {
    const fields = getDbFields(PAYMENT_METHOD_DBMODEL);
    const options = { condition: { id }, fields };
    const paymentMethod = await deleteOne('payment_method', options);
    return paymentMethod;
  },
};

module.exports = PaymentMethodService;
