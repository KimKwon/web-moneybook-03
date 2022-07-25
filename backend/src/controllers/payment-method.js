const PaymentMethodService = require('../services/payment-method');

const getPaymentMethod = async (req, res) => {
  const result = await PaymentMethodService.getPaymentMethod();

  if (!result) {
    res.status(500).send('서버가 잘못했어요');
  }

  res.status(200).json(result);
};

const createPaymentMethod = (req, res) => {
  PaymentMethodService.createPaymentMethod();
  res.status(200).send('결제수단이다~');
};

const deletePaymentMethod = (req, res) => {
  PaymentMethodService.deletePaymentMethod();
  res.status(200).send('결제수단이다~');
};

module.exports = { getPaymentMethod, createPaymentMethod, deletePaymentMethod };
