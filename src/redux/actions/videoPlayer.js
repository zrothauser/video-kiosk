import * as types from './actionTypes';

export function setVideoID(id) {
  return {
    type: types.VIDEO_PLAYER_SET_VIDEO_ID,
    id,
  };
}

export function playPauseVideo() {
  return {
    type: types.VIDEO_PLAYER_PLAY_PAUSE,
  };
}
