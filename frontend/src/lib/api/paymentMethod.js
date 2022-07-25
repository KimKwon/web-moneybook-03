import { baseUrl } from '@/constants/base-url';

/**
 * @interface PaymentMethod {
 *  id
 *  name
 *  isDelete
 * }
 * @returns { Promise<PaymentMethod[]> }
 */
export const getPaymentMethod = async () => {
  try {
    const response = await fetch(`${baseUrl}/payment-method`);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
