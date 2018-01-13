import * as types from './actionTypes';
import * as actions from './video';

describe('actions', () => {
  it('should create an action to fetch vimeo data from the API', () => {
    const id = 555555;
    const expectedAction = {
      type: types.FETCH_VIMEO_DATA,
      id,
    };

    expect(actions.fetchVimeoData(id)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to fetch mp4 data from the API', () => {
    const id = 555555;
    const expectedAction = {
      type: types.FETCH_MP4_DATA,
      id,
    };

    expect(actions.fetchMP4Data(id)).toEqual(expectedAction);
  });
});

describe('actions', () => {
  it('should create an action to fetch caption data from the API', () => {
    const id = 555555;
    const expectedAction = {
      type: types.FETCH_CAPTION_DATA,
      id,
    };

    expect(actions.fetchCaptionData(id)).toEqual(expectedAction);
  });
});
