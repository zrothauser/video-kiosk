import * as types from './actionTypes';
import * as actions from './app';

describe('actions', () => {
  it('should create an action to fetch app data from the API', () => {
    const expectedAction = {
      type: types.FETCH_APP_DATA,
    };

    expect(actions.fetchAppData()).toEqual(expectedAction);
  });

  it('should create an action to toggle the Video Index screen', () => {
    const expectedAction = {
      type: types.INTERFACE_TOGGLE_VIDEO_INDEX,
    };

    expect(actions.toggleVideoIndex()).toEqual(expectedAction);
  });
});
