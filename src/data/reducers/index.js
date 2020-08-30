import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { User } from './User.reducer';

const rootReducer = combineReducers({
  auth,
  User,
});

export default rootReducer;
