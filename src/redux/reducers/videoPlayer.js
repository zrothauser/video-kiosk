// Action types
import * as types from '../actions/actionTypes';

const initialState = {
  videoPlayer: {
    isPlaying: false,
    volume: 65,
    currentTime: 0,
    videoID: null,
  },
  interface: {
    showControls: false,
    showPlayPauseButton: false,
  },
};

export default (state = initialState, action) => {
  switch (action.type) {
    case types.VIDEO_PLAYER_SET_VIDEO_ID: {
      return {
        ...state,
        videoPlayer: {
          ...state.videoPlayer,
          videoID: action.id,
        },
      };
    }

    case types.VIDEO_PLAYER_PLAY_PAUSE: {
      return {
        ...state,
        videoPlayer: {
          ...state.videoPlayer,
          isPlaying: !state.videoPlayer.isPlaying,
        },
      };
    }

    default:
      return state;
  }
};
