const initialState = {
  auth: false,
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case 'CHANGE_STATUS':
      return { ...state, auth: true };
    default:
      return state;
  }
}
