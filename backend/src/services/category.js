const { find } = require("../lib/query");

const CategoryService = { 

   getCategory : (params, order) => {
        //있는 필드인지 검사하고 매핑
        // const order = { } // 두개를 받는다. 기준 점, 오름차순 여부  
        const category = find('category', params, order )
        return category;
    },


    updateCategory : (id, categoryMap) => {
        const category = updateOne('category',id,categoryMap )
        return category;
    }
}

module.exports = CategoryService;
