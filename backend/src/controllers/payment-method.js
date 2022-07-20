const getPaymentMethod = (req, res) => {
  res.status(200).send('결제수단이다~');
};

const createPaymentMethod = (req, res) => {
  res.status(200).send('결제수단이다~');
};

const deletePaymentMethod = (req, res) => {
  res.status(200).send('결제수단이다~');
};

module.exports = { getPaymentMethod, createPaymentMethod, deletePaymentMethod };
