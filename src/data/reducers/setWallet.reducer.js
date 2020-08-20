const initialState = {
  salary: null,
  currency: '',
};

export function setWallet(state = initialState, action) {
  switch (action.type) {
    case 'SET_WALLET':
      return { ...state, salary: action.salary, currency: action.currency };
    default:
      return state;
  }
}
