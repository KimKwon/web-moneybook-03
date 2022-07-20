const PaymentMethodService = require("../services/payment-method");

const getPaymentMethod = (req, res) => {
  PaymentMethodService.getPaymentMethod();
  res.status(200).send('결제수단이다~');
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
