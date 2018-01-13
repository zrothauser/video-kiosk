import * as types from './actionTypes';

export function fetchVimeoData(id) {
  return {
    type: types.FETCH_VIMEO_DATA,
    id,
  };
}

export function fetchMP4Data(id) {
  return {
    type: types.FETCH_MP4_DATA,
    id,
  };
}

export function fetchCaptionData(id) {
  return {
    type: types.FETCH_CAPTION_DATA,
    id,
  };
}

export default fetchVimeoData;
