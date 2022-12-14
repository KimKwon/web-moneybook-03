const PaymentMethodService = require('../services/payment-method');

const getPaymentMethod = async (req, res) => {
  const result = await PaymentMethodService.getPaymentMethod();
  if (!result) {
    return res.status(500).send('server error');
  }

  res.status(200).json(result);
};

const createPaymentMethod = async (req, res) => {
  const userId = req.get('X-USER-ID') || 'star';
  const requestData = req.body;
  requestData.userId = userId;
  const result = await PaymentMethodService.createPaymentMethod(requestData);
  if (!result) {
    return res.status(500).send('server error');
  }
  res.status(200).send(result);
};

const deletePaymentMethod = async (req, res) => {
  const id = req.params.id;
  const result = await PaymentMethodService.deletePaymentMethod(id);

  if (!result) {
    return res.status(500).send('server error');
  }
  res.status(200).send(result);
};

module.exports = { getPaymentMethod, createPaymentMethod, deletePaymentMethod };
