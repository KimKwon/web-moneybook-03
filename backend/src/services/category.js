const { updateOne, findAll } = require('../lib/query');
const CATEGORY_DBMODEL = {
  color: 'color',
};
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
    const categoryMap = Object.entries(requestData).reduce((acc, [key, value]) => {
      if (!key in CATEGORY_DBMODEL) return acc;
      const dbKey = CATEGORY_DBMODEL[key];
      acc[dbKey] = value;
      return acc;
    }, new Object());

    const category = await updateOne('category', { id }, categoryMap);
    return category;
  },
};

module.exports = CategoryService;
