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
    return result;
  } catch (error) {
    return null;
  }
};
/**
 * @interface HistoryItem {
 *  categoryId
 *  paymentMethodId
 *  date
 *  content
 *  amount
 *  isProfit
 * }
 * @param { HistoryItem } historyItem
 * @returns { Promise<HistoryItem}> }
 */
export const createAccountHistory = async (historyItem) => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(historyItem),
  };
  try {
    const response = await fetch(`${baseUrl}/account-history`, option);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
/**
 * @interface HistoryItem {
 *  categoryId
 *  paymentMethodId
 *  date
 *  content
 *  amount
 *  isProfit
 * }
 * @param { Number} id
 * @param { HistoryItem } historyItem
 * @returns { Promise<HistoryItem> }
 */
export const patchAccountHistory = async (id, historyItem) => {
  const option = {
    method: 'PATCH',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify(historyItem),
  };
  try {
    const response = await fetch(`${baseUrl}/account-history/${id}`, option);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
