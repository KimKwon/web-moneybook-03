import { updateDate } from '@/utils/date';

function reducer(state, action, payload) {
  switch (action) {
    case 'updateMonth':
      const currentDate = { year: state.currentDate.year, month: state.currentDate.month };
      const nextDate = updateDate(currentDate, payload);
      return { ...state, currentDate: nextDate };
    case 'addCategory':
      return { ...state, category: [...state.category, payload] };
    case 'addPaymentMethod':
      return { ...state, paymentMethods: [...state.paymentMethods, payload] };
    case 'addAccountHistory':
      return { ...state, accountHistory: [...state.accountHistory, payload] };
    default:
      return { ...state };
  }
}

export default reducer;
