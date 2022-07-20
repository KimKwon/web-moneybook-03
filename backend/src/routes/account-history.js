const { Router } = require('express');
const {
  getAccountHistory,
  createAccountHistory,
  updateAccountHistory,
} = require('../controllers/account-history');

const router = Router();

router.get('/', getAccountHistory);

router.post('/', createAccountHistory);

router.patch('/:id', updateAccountHistory);

module.exports = router;
