const { Router } = require('express');
const { getCategory, patchCategory } = require('../controllers/category');

const router = Router();

router.get('/', getCategory);

router.patch('/:id', patchCategory);

module.exports = router;
