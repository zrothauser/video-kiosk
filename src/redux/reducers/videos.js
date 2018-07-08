// Action types
import * as types from '../actions/actionTypes';

// Initial state
const initialState = {
  videos: [],
  isLoading: false,
  isErrored: false,
  error: null,
  sortKey: 'title',
};

// And the actual reducer
export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_APP_DATA:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_APP_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isErrored: true,
        error: action.error,
      };

    case types.FETCH_APP_DATA_RECEIVED: {
      if (!action.data.length) {
        // TODO handle a 404 error
        return {
          ...state,
        };
      }

      const rawData = action.data[0];

      return {
        ...state,
        videos: rawData._embedded.videos, // eslint-disable-line no-underscore-dangle
        isLoading: false,
        isErrored: false,
        error: null,
      };
    }

    default:
      return state;
  }
};
