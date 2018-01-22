// Dependencies
import { combineReducers } from 'redux';
import { routerReducer } from 'react-router-redux';

// Reducers
import app from './app';
import categories from './categories';
import videos from './videos';
import videoPlayer from './videoPlayer';

export default combineReducers({
  routing: routerReducer,
  app,
  categories,
  videos,
  videoPlayer,
});
