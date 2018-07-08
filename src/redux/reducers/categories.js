// Dependencies
import slugify from 'slugify';

// Action types
import * as types from '../actions/actionTypes';

const initialState = {
  categories: [
    {
      slug: null,
      title: '',
      videos: [],
    },
  ],
  isLoading: false,
  isErrored: false,
  error: null,
};

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
        error: action.error.message,
      };

    case types.FETCH_APP_DATA_RECEIVED: {
      if (!action.data.length) {
        // TODO handle a 404 error
        return {
          ...state,
        };
      }

      const rawCategoryData = action.data[0].categories;

      const processedData = rawCategoryData.map(category => ({
        slug: slugify(category.category_name, { lower: true }),
        title: category.category_name,
        videos: category.videos,
      }));

      return {
        ...state,
        categories: processedData,
        isLoading: false,
        isErrored: false,
        error: null,
      };
    }

    default:
      return state;
  }
};
