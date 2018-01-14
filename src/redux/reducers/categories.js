// Dependencies
import slugify from 'slugify';

// Action types
import * as types from '../actions/actionTypes';

// Utilities
import { extractVideoIDsFromCategoryData } from '../../utils/video';

const initialState = {
  categories: [
    {
      slug: null,
      title: '',
      visibility: 'visible',
      videos: [],
    },
    {
      slug: null,
      title: '',
      visibility: 'visible',
      videos: [],
    },
    {
      slug: null,
      title: '',
      visibility: 'visible',
      videos: [],
    },
    {
      slug: null,
      title: '',
      visibility: 'visible',
      videos: [],
    },
    {
      slug: null,
      title: '',
      visibility: 'visible',
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
        error: action.error,
      };

    case types.FETCH_APP_DATA_RECEIVED: {
      // Flatten the data, the API has some redundancy and things
      // are nested too deeply
      const rawCategoryData = action.data[0].set.categories;
      const processedData = rawCategoryData.map((category) => {
        const categoryData = category.category;
        const videoIDs = extractVideoIDsFromCategoryData(categoryData);

        return {
          slug: slugify(categoryData.title, { lower: true }),
          title: categoryData.title,
          visibility: categoryData.visibility,
          videos: videoIDs,
        };
      });

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
