const CategoryService = require('../services/category')

const getCategory = (req, res) => {
  CategoryService.getCategory();
  res.status(200).send('결제수단이다~');
};

const patchCategory = (req, res) => {
  CategoryService.updateCategory();
  res.status(200).send('결제수단이다~');
};

module.exports = { getCategory, patchCategory };
