const { Router } = require('express');
const {
  getPaymentMethod,
  createPaymentMethod,
  deletePaymentMethod,
} = require('../controllers/payment-method');

const router = Router();

router.get('/', getPaymentMethod);

router.post('/', createPaymentMethod);

router.delete('/:id', deletePaymentMethod);

module.exports = router;
