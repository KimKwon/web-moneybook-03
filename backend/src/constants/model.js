export const CATEGORY_DBMODEL = {
  id: 'id',
  userId: 'user_id',
  color: 'color',
  name: 'name',
  isProfit: 'is_profit',
};
export const ACCOUNT_HISTORY_DBMODEL = {
  id: 'id',
  userId: 'user_id',
  categoryId: 'category_id',
  paymentMethodId: 'payment_method_id',
  date: 'date',
  content: 'contaent',
  amount: 'amount',
  isProfit: 'is_profit',
};

export const PAYMENT_METHOD_DBMODEL = {
  id: 'id',
  userId: 'user_id',
  name: 'name',
  isDelete: 'is_delete',
};
