import { updateDate } from '@/utils/date';
import {
  ADD_ACCOUNT_HISTORY,
  ADD_CATEGORY,
  ADD_PAYMENT_METHOD,
  CHANGE_LOADING_STATE,
  REMOVE_PAYMENT_METHOD,
  SET_ACCOUNT_HISTORY,
  SET_CATEGORY,
  SET_PATMENT_METHOD,
  UPDATE_ACCOUNT_HISTORY,
  UPDATE_MONTH,
} from './action';

function reducer(state, action, payload) {
  switch (action) {
    case UPDATE_MONTH:
      const currentDate = { year: state.currentDate.year, month: state.currentDate.month };
      const nextDate = updateDate(currentDate, payload);
      return { ...state, currentDate: nextDate };
    case SET_CATEGORY:
      return { ...state, category: payload };
    case SET_PATMENT_METHOD:
      return { ...state, paymentMethods: payload };
    case ADD_PAYMENT_METHOD:
      return { ...state, paymentMethods: [...state.paymentMethods, payload] };
    case REMOVE_PAYMENT_METHOD:
      const { id: targetMethodId } = payload;
      return {
        ...state,
        paymentMethods: state.paymentMethods.filter((method) => method.id !== +targetMethodId),
      };
    case SET_ACCOUNT_HISTORY:
      return { ...state, accountHistory: payload };
    case ADD_ACCOUNT_HISTORY:
      return { ...state, accountHistory: [...state.accountHistory, payload] };
    case UPDATE_ACCOUNT_HISTORY:
      const { id: targetHistoryId } = payload;
      const targetIndex = state.accountHistory.findIndex(
        (history) => history.id === targetHistoryId,
      );

      if (targetIndex < 0) return state;

      const nextHistory = [...state.accountHistory];
      nextHistory[targetIndex] = payload;

      return { ...state, accountHistory: nextHistory };
    case CHANGE_LOADING_STATE:
      return { ...state, isLoading: payload };
    default:
      return { ...state };
  }
}

export default reducer;
