const { Router } = require('express');

const router = Router();

router.get('/', (req, res) => {
  res.status(200).send('카테고리라니까 -_- ');
});

module.exports = router;
