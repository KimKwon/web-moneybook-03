import { baseUrl } from '@/constants/base-url';

/**
 * @interface Statistic {
 *  baseDate
 *  sum
 * }
 * @date 2022-07-26
 * @param { Statistic } query
 * @returns { Promise<Statistic> }
 */
export const getStatistic = async (query) => {
  const queryString = Object.entries(query).reduce((acc, [key, val]) => acc + `${key}=${val}&`, '');
  try {
    const response = await fetch(`${baseUrl}/statistic?${queryString}`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
