// App action types
export const FETCH_APP_SETTINGS = 'api/settings/fetch';
export const FETCH_APP_SETTINGS_ERROR = 'api/settings/errorReceived';
export const FETCH_APP_SETTINGS_RECEIVED = 'api/settings/dataReceived';

export const FETCH_APP_DATA = 'api/app/fetchData';
export const FETCH_APP_DATA_ERROR = 'api/app/errorReceived';
export const FETCH_APP_DATA_RECEIVED = 'api/app/dataReceived';

export const INTERFACE_TOGGLE_VIDEO_INDEX = 'interface/toggleVideoIndex';
export const INTERFACE_CLOSE_VIDEO_INDEX = 'interface/closeVideoIndex';

// Video Player actions
export const VIDEO_PLAYER_SET_VIDEO_ID = 'interface/player/setVideoID';
export const VIDEO_PLAYER_PLAY_PAUSE = 'interface/player/playPause';
export const VIDEO_PLAYER_UPDATE_PROGRESS = 'interface/player/updateProgress';
export const VIDEO_PLAYER_TOGGLE_CONTROLS = 'interface/player/controlsVisibility';
export const VIDEO_PLAYER_TOGGLE_CAPTIONS = 'interface/player/captionsVisibility';
export const VIDEO_PLAYER_SET_VOLUME = 'interface/player/setVolume';
export const VIDEO_PLAYER_TOGGLE_VOLUME_CONTROL = 'interface/player/toggleVolumeControl';
