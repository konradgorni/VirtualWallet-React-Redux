import { composeWithDevTools } from 'redux-devtools-extension';

import { createStore } from 'redux';
import auth from './reducers/index';

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(auth));
}

const store = createStore(auth, composeWithDevTools());
export default store;
