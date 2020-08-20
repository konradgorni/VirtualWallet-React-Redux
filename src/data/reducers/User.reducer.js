const initialState = {
  email: '',
  uid: null,
};

export function User(state = initialState, action) {
  switch (action.type) {
    case 'ADD_INFO':
      return { email: action.email, uid: action.uid };
    default:
      return state;
  }
}
