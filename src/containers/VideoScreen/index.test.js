// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

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
        uri: null,
      }],
      match: {
        params: {
          id: '1000',
        },
      },
      getMP4Data: mockfetchMP4Data,
      getCaptionData: mockFetchCaptionData,
    };

    beforeEach(() => {
      wrapper = shallow(<VideoScreen {...mockProps} />);
    });

    it('renders without crashing', () => {
      wrapper.find('div');
    });
  });
});
