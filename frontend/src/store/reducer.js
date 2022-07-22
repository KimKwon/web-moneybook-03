import { updateDate } from '@/utils/date';

function reducer(state, action, payload) {
  switch (action) {
    case 'ADD':
      return { ...state, category: [...state.category, payload] };
    case 'updateMonth':
      const currentDate = { year: state.currentDate.year, month: state.currentDate.month };
      const nextDate = updateDate(currentDate, payload);
      return { ...state, currentDate: nextDate };
    default:
      return { ...state };
  }
}

export default reducer;
