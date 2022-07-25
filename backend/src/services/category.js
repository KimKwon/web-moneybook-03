const { find, findAll } = require('../lib/query');

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

  updateCategory: (id, categoryMap) => {
    const category = updateOne('category', id, categoryMap);
    return category;
  },
};

module.exports = CategoryService;
