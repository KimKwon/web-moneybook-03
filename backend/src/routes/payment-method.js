const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('결제수단이다~');
});

module.exports = router;
