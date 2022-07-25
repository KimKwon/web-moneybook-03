const { updateOne, findAll } = require('../lib/query');
const { CATEGORY_DBMODEL } = require('../constants/model');
const { getValidDbMap } = require('../utils/db');

const CategoryService = {
  getCategory: async (type) => {
    try {
      const isProfit = type === 'income';
      const category = await findAll('category', {
        where: {
          is_profit: isProfit,
        },
        fields: ['id', 'name', 'color', 'is_profit as isProfit'],
      });

      if (!category) return null;

      return category[0];
    } catch (error) {
      return null;
    }
  },

  updateCategory: async (id, requestData) => {
    const validMap = getValidDbMap(CATEGORY_DBMODEL, requestData);
    const options = { condition: { id }, updateMap: validMap };
    const category = await updateOne('category', options);
    return category;
  },
};

module.exports = CategoryService;
