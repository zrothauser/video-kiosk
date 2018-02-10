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

export function toggleControls(show) {
  return {
    type: types.VIDEO_PLAYER_TOGGLE_CONTROLS,
    show,
  };
}

export function toggleCaptions() {
  return {
    type: types.VIDEO_PLAYER_TOGGLE_CAPTIONS,
  };
}

/**
 * Updates volume setting.
 *
 * @param {int} volume Volume on a scale of 0-100.
 */
export function setVolume(volume) {
  return {
    type: types.VIDEO_PLAYER_SET_VOLUME,
    volume,
  };
}

/**
 * By default the volume control is hidden, this will toggle it.
 */
export function toggleVolumeControl() {
  return {
    type: types.VIDEO_PLAYER_TOGGLE_VOLUME_CONTROL,
  };
}
