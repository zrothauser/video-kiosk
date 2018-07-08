// Dependencies
import request from 'superagent';

// Action types
import * as types from '../redux/actions/actionTypes';

// API URLs
const API_BASE_URL = 'http://video.clyffordstillmuseum.org/wp-v2/wp-json/wp/v2/set';
const DEFAULT_SET_URL = `${API_BASE_URL}/?slug=default&_embed=1`;

/**
 * Middleware to retrieve base API data.
 */
// eslint-disable-next-line no-unused-vars
export const apiData = store => next => (action) => {
  // Pass all actions through by default
  next(action);

  switch (action.type) {
    case types.FETCH_APP_DATA: {
      request
        .get(DEFAULT_SET_URL)
        .end((error, res) => {
          if (error) {
            return next({
              type: types.FETCH_APP_DATA_ERROR,
              error,
            });
          }
          const data = JSON.parse(res.text);

          // Dispatch a success action
          next({
            type: types.FETCH_APP_DATA_RECEIVED,
            data,
          });

          return true;
        });
      break;
    }

    default:
      break;
  }
};

export default apiData;
