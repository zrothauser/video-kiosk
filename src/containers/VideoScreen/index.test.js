// Dependencies
import React from 'react';
import Enzyme, { mount, shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Component to test
import { VideoScreen } from './index';

describe('containers', () => {
	describe('VideoScreen', () => {
		let wrapper;

		// Mocking mapDispatchToProps
		const mockfetchMP4Data = jest.fn();
		const mockFetchCaptionData = jest.fn();

		const mockProps = {
			title: '',
			id: null,
			description: '',
			mp4Link: null,
			thumbnailFull: null,
			captions: [{
				uri: null
			}],
			match: {
				params: {
					id: 1000
				}
			},
			fetchMP4Data: mockfetchMP4Data,
			fetchCaptionData: mockFetchCaptionData,
		};

		beforeEach(() => {
			wrapper = shallow(<VideoScreen {...mockProps}/>)
		});

		it('renders without crashing', () => {
				wrapper.find('div');
		});
	});
});
