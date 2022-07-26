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

export const createPaymentMethod = async (paymentMethod) => {
  const option = {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
    },
    body: JSON.stringify({ name: paymentMethod, is_delete: 0 }),
  };
  try {
    const response = await fetch(`${baseUrl}/payment-method`, option);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};

export const deletePaymentMethod = async (id) => {
  const option = {
    method: 'DELETE',
  };
  try {
    const response = await fetch(`${baseUrl}/payment-method/${id}`, option);
    const result = await response.json();
    return result;
  } catch (error) {
    return null;
  }
};
