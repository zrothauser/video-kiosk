// Action types
import * as types from '../actions/actionTypes';

const initialState = {
  playerState: {
    isPlaying: false,
    volume: 65,
    currentTime: 0,
    seek: null,
    videoID: null,
  },
  interface: {
    showControls: true,
    showVolumeControl: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.VIDEO_PLAYER_SET_VIDEO_ID: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          videoID: action.id,
        },
      };
    }

    case types.VIDEO_PLAYER_PLAY_PAUSE: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          isPlaying: action.play,
        },
      };
    }

    case types.VIDEO_PLAYER_UPDATE_PROGRESS: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          currentTime: action.time,
        },
      };
    }

    case types.VIDEO_PLAYER_TOGGLE_CONTROLS: {
      return {
        ...state,
        interface: {
          ...state.interface,
          showControls: action.show,
        },
      };
    }

    case types.VIDEO_PLAYER_SET_VOLUME: {
      return {
        ...state,
        playerState: {
          ...state.playerState,
          volume: action.volume,
        },
      };
    }

    case types.VIDEO_PLAYER_TOGGLE_VOLUME_CONTROL: {
      return {
        ...state,
        interface: {
          ...state.interface,
          showVolumeControl: !state.interface.showVolumeControl,
        },
      };
    }

    default:
      return state;
  }
};
