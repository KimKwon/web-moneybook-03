import { SELECTOR_MAP } from '@/constants/selector-map';
import store from '@/store/index';

export const getCategoryColor = (categoryId) => {
  let categories = store.getState(SELECTOR_MAP.CATEGORY);
  categories = [...categories.expenditure, ...categories.income];
  const category = categories.find((category) => {
    return category.id == categoryId;
  });
  return category.color;
};
