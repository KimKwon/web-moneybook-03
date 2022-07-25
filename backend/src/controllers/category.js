const CategoryService = require('../services/category');

const getCategory = async (req, res) => {
  const result = await CategoryService.getCategory(req.query.type);
  if (!result) res.status(500).send('서버가 잘못했어요.');
  res.status(200).json(result);
};

const patchCategory = async (req, res) => {
  const id = req.params.id;
  if (!id) res.status(400).send('server error');
  const result = await CategoryService.updateCategory(id, req.body);
  if (!result) {
    res.status(500).send('server error');
  }
  res.status(200).send(result);
};

module.exports = { getCategory, patchCategory };
