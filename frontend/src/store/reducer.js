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
    case 'addAccountHistory':
      return { ...state, accountHistory: [...state.accountHistory, payload] };
    case 'updateAccountHistory':
      const { id } = payload;
      const targetIndex = state.accountHistory.findIndex((history) => history.id === id);

      if (targetIndex < 0) return state;

      const nextHistory = [...state.accountHistory];
      nextHistory[targetIndex] = payload;

      return { ...state, accountHistory: nextHistory };
    default:
      return { ...state };
  }
}

export default reducer;
