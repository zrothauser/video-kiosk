import * as types from './actionTypes';
import * as actions from './appData';

describe('actions', () => {
	it('should create an action to fetch app data from the API', () => {
		const expectedAction = {
			type: types.FETCH_APP_DATA,
		};

		expect(actions.fetchAppData()).toEqual(expectedAction);
	});
});
