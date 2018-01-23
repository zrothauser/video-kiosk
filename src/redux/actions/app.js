import * as types from './actionTypes';

// Actions
export function fetchAppData() {
  return {
    type: types.FETCH_APP_DATA,
  };
}

export function toggleVideoIndex() {
  return {
    type: types.INTERFACE_TOGGLE_VIDEO_INDEX,
  };
}

export function sortVideoIndexList(sortKey) {
  return {
    type: types.INTERFACE_VIDEO_INDEX_SORT,
    sortKey,
  };
}
