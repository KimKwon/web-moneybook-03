const { create, deleteOne, findAll } = require('../lib/query');

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

  createPaymentMethod: (paymentMethodMap) => {
    const paymentMethod = create('paymentMethod', paymentMethodMap);
    return paymentMethod;
  },

  deletePaymentMethod: (id, condition) => {
    const paymentMethod = deleteOne('paymentMethod', id, condition);
    return paymentMethod;
  },
};

module.exports = PaymentMethodService;
