const initialState = {
  bilans: 900,
  transactions: [],
};

export function Wallet(state = initialState, action) {
  switch (action.type) {
    case 'ADD_TRANSACTIONS':
      console.log('add transactions', action.obiekt);
      return state;
    case 'ADD_TRANSACTIONS_ERROR':
      console.log('error', action.err);
      return state;

    default:
      return state;
  }
}
