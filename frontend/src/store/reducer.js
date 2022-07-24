import { updateDate } from '@/utils/date';

function reducer(state, action, payload) {
  switch (action) {
    case 'updateMonth':
      const currentDate = { year: state.currentDate.year, month: state.currentDate.month };
      const nextDate = updateDate(currentDate, payload);
      return { ...state, currentDate: nextDate };
    case 'addCategory':
      return { ...state, category: [...state.category, payload] };
    case 'setCategory':
      return { ...state, category: payload };
    case 'setPaymentMethod':
      return { ...state, paymentMethods: payload };
    case 'setAccountHistory':
      return { ...state, accountHistory: payload };
    default:
      return { ...state };
  }
}

export default reducer;
