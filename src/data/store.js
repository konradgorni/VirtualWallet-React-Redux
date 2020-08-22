import { composeWithDevTools } from 'redux-devtools-extension';
import { createStore, applyMiddleware } from 'redux';
import auth from './reducers/index';
import thunk from 'redux-thunk';

if (process.env.NODE_ENV !== 'production' && module.hot) {
  module.hot.accept('./reducers', () => store.replaceReducer(auth));
}

const store = createStore(auth, composeWithDevTools(applyMiddleware(thunk)));
export default store;
