// Action types
import * as types from '../actions/actionTypes';

const initialState = {
  settings: {
    defaultSet: '',
    isLoading: false,
    isErrored: false,
    error: null,
  },
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
  selectedSet: '',
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.FETCH_APP_SETTINGS:
      return {
        ...state,
        settings: {
          ...state.settings,
          isLoading: true,
          isErrored: false,
          error: null,
        },
      };

    case types.FETCH_APP_SETTINGS_ERROR:
      return {
        ...state,
        settings: {
          ...state.settings,
          isLoading: false,
          isErrored: true,
          error: action.error.message,
        },
      };

    case types.FETCH_APP_SETTINGS_RECEIVED: {
      if (!action.data.length) {
        // TODO handle a 404 error
        return {
          ...state,
          settings: {
            ...state.settings,
            isLoading: false,
            isErrored: false,
            error: null,
            defaultSet: action.data.default_set,
          },
        };
      }

      return {
        ...state,
      };
    }

    case types.FETCH_APP_DATA:
      return {
        ...state,
        data: {
          ...state.data,
          isLoading: true,
        },
        selectedSet: action.setName,
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
      if (!action.data.length) {
        // TODO handle a 404 error
        return {
          ...state,
        };
      }

      const rawAppData = action.data[0];
      const backgroundVideoID = rawAppData.background_video.id;

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
