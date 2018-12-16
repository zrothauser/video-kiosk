import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoControls from './index';

describe('components', () => {
  describe('VideoControls', () => {
    const mockProps = {
      title: 'Test Title',
      parentCategory: 'go-deeper',
      parentCategoryTitle: 'Go Deeper',
      duration: 122,
      currentTime: 30,
      allVideosInCategory: [],
      indexInCategory: 0,
      hasCaptions: true,
      volume: 60,
      handleSeek: jest.fn(),
      handleVolumeChange: jest.fn(),
      toggleCaptions: jest.fn(),
      visible: true,
      areCaptionsVisible: true,
    };

    it('renders without crashing', () => {
      shallow(<VideoControls {...mockProps} />);
    });

    it('renders correctly', () => {
      const VideoControlsComponent = renderer.create(
        <Router>
          <VideoControls {...mockProps} />
        </Router>,
      );

      expect(VideoControlsComponent).toMatchSnapshot();
    });
  });
});
