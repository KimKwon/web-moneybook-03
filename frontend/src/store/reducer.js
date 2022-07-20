function reducer(state, action, payload) {
  switch (action) {
    case 'ADD':
      return { ...state, category: [...state.category, payload] };
    default:
      return state;
  }
}

export default reducer;
