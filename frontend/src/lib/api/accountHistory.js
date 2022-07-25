import { baseUrl } from '@/constants/base-url';

/**
 * @interface AccountHistory {
 *  id
 *  date
 *  content
 *  amount
 *  methodName
 *  methodId
 *  categoryName
 *  categoryId
 *  isProfit
 * }
 * @date 2022-07-25
 * @param { AccountHistory } query
 * @returns { Promise<AccountHistory[]> }
 */
export const getAccountHistory = async (query) => {
  const queryString = Object.entries(query).reduce((acc, [key, val]) => acc + `${key}=${val}&`, '');
  try {
    const response = await fetch(`${baseUrl}/account-history?${queryString}`);
    const result = await response.json();
    console.log(result);
    return result;
  } catch (error) {
    return null;
  }
};
