const CategoryService = require('../services/category')

const getCategory = async (req, res) => {
  const result = await CategoryService.getCategory(req.query.type);
  if (!result) res.status(500).send('서버가 잘못했어요.');
  res.status(200).json(result);
};

const patchCategory = (req, res) => {
  CategoryService.updateCategory();
  res.status(200).send('결제수단이다~');
};

module.exports = { getCategory, patchCategory };
