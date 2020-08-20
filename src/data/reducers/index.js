import { combineReducers } from 'redux';

import { auth } from './auth.reducer';
import { setWallet } from './setWallet.reducer';
import { Wallet } from './Wallet.reducer';
import { User } from './User.reducer';

const rootReducer = combineReducers({
  auth,
  setWallet,
  Wallet,
  User,
});

export default rootReducer;
