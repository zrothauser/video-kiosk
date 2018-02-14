// Action types
import * as types from '../actions/actionTypes';

// Helpers
import { extractVimeoIDFromURL } from '../../utils/video';

const initialState = {
  data: {
    title: null,
    backgroundVideo: null,
    isLoading: false,
    isErrored: false,
    error: null,
  },
  interface: {
    isVideoIndexOpen: false,
    videoIndexSorting: 'title',
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_APP_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          isLoading: true,
        },
      };

    case types.FETCH_APP_DATA_ERROR:
      return {
        ...state,
        data: {
          ...state.data,
          isLoading: false,
          isErrored: true,
          error: action.error.message,
        },
      };

    case types.FETCH_APP_DATA_RECEIVED: {
      const rawAppData = action.data[0].set;
      const backgroundVideoID = extractVimeoIDFromURL(rawAppData.backgroundvideo);

      return {
        ...state,
        data: {
          ...state.data,
          title: rawAppData.title,
          backgroundVideo: backgroundVideoID,
          isLoading: false,
          isErrored: false,
          error: null,
        },
      };
    }

    case types.INTERFACE_TOGGLE_VIDEO_INDEX: {
      return {
        ...state,
        interface: {
          ...state.interface,
          isVideoIndexOpen: !state.interface.isVideoIndexOpen,
        },
      };
    }

    case types.INTERFACE_CLOSE_VIDEO_INDEX: {
      return {
        ...state,
        interface: {
          ...state.interface,
          isVideoIndexOpen: false,
        },
      };
    }

    default:
      return state;
  }
};
