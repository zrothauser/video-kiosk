// Action types
import * as types from '../actions/actionTypes';

const initialState = {
  playerState: {
    isPlaying: false,
    volume: 65,
    currentTime: 0,
    videoID: null,
  },
  interface: {
    showControls: true,
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
          isPlaying: !state.playerState.isPlaying,
        },
      };
    }

    default:
      return state;
  }
};
