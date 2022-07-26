import { baseUrl } from '@/constants/base-url';

/**
 * @interface Category {
 *  id
 *  name
 *  color
 * }
 * @date 2022-07-25
 * @param { "income" | "expenditure" } type
 * @returns { Promise<Category[]> }
 */
export const getCategories = async (type) => {
  try {
    const response = await fetch(`${baseUrl}/category?type=${type}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const patchCategory = async (id, category) => {
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(category),
  };
  try {
    const response = await fetch(`${baseUrl}/category/${id}`, option);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
