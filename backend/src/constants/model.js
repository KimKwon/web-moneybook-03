const CATEGORY_DBMODEL = {
  id: 'id',
  userId: 'user_id',
  color: 'color',
  name: 'name',
  isProfit: 'is_profit',
};
const ACCOUNT_HISTORY_DBMODEL = {
  id: 'id',
  userId: 'user_id',
  categoryId: 'category_id',
  paymentMethodId: 'payment_method_id',
  date: 'date',
  content: 'content',
  amount: 'amount',
  isProfit: 'is_profit',
};

const PAYMENT_METHOD_DBMODEL = {
  id: 'id',
  userId: 'user_id',
  name: 'name',
  isDelete: 'is_delete',
};

module.exports = { CATEGORY_DBMODEL, ACCOUNT_HISTORY_DBMODEL, PAYMENT_METHOD_DBMODEL };
