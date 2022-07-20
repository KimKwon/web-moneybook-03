const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('바바바바바바통계다~');
});

module.exports = router;
