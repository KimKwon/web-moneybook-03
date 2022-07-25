const { create, deleteOne, findAll } = require('../lib/query');
const { PAYMENT_METHOD_DBMODEL } = require('../constants/model');
const { getValidDbMap } = require('../utils/db');
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
    const options = { createMap: validMap };
    const accountHistory = create('payment_method', options);
    return accountHistory;
    // const paymentMethodMap = Object.entries(requestData).reduce(
    //   (acc, [key, value]) => {
    //     if (!key in PAYMENT_METHOD_DBMODEL) return acc;
    //     const dbKey = PAYMENT_METHOD_DBMODEL[key];
    //     acc.map[dbKey] = value;
    //     acc.fields.push(`${dbKey} as ${key}`);
    //     return acc;
    //   },
    //   { map: {}, fields: [] },
    // );
    // const paymentMethod = await create(
    //   'payment_method',
    //   paymentMethodMap.map,
    //   paymentMethodMap.fields,
    // );
  },

  deletePaymentMethod: async (id) => {
    const paymentMethod = await deleteOne('payment_method', { id });
    return paymentMethod;
  },
};

module.exports = PaymentMethodService;
