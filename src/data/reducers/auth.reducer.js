import * as constants from '../constants';
const initialState = {
  auth: true,
};

export function auth(state = initialState, action) {
  switch (action.type) {
    case constants.CHANGE_STATUS:
      return { ...state, auth: true };
    default:
      return state;
  }
}
