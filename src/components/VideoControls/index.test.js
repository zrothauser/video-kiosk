import React from 'react';
import { shallow } from 'enzyme';
import VideoControls from './index';

describe('components', () => {
  describe('VideoControls', () => {
    it('renders without crashing', () => {
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

      shallow(<VideoControls {...mockProps} />);
    });
  });
});
