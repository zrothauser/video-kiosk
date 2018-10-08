// Dependencies
import { createStore, applyMiddleware, compose } from 'redux';
import { routerMiddleware } from 'react-router-redux';
import thunk from 'redux-thunk';
import createHistory from 'history/createBrowserHistory';

// Reduceres
import rootReducer from './reducers';

// Our API middleware
import { apiData, settingsData } from '../utils/api';

export const history = createHistory({ basename: '/' });

const initialState = {};
const enhancers = [];
const middleware = [
  thunk,
  routerMiddleware(history),
  settingsData,
  apiData,
];

if (process.env.NODE_ENV === 'development') {
  const { devToolsExtension } = window;

  if (typeof devToolsExtension === 'function') {
    enhancers.push(devToolsExtension());
  }
}

const composedEnhancers = compose(
  applyMiddleware(...middleware),
  ...enhancers,
);

const store = createStore(
  rootReducer,
  initialState,
  composedEnhancers,
);

export default store;
