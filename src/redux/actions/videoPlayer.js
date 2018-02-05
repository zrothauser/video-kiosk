import * as types from './actionTypes';

export function setVideoID(id) {
  return {
    type: types.VIDEO_PLAYER_SET_VIDEO_ID,
    id,
  };
}

export function playPauseVideo(play) {
  return {
    type: types.VIDEO_PLAYER_PLAY_PAUSE,
    play,
  };
}

export function updateProgress(time) {
  return {
    type: types.VIDEO_PLAYER_UPDATE_PROGRESS,
    time,
  };
}

export function seekTime(time) {
  return {
    type: types.VIDEO_PLAYER_SEEK,
    time,
  };
}

export function toggleControls() {
  return {
    type: types.VIDEO_PLAYER_TOGGLE_CONTROLS,
  };
}
