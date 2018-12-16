// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { VideoScreen } from './index';

describe('containers', () => {
  describe('VideoScreen', () => {
    let wrapper;

    const mockProps = {
      history: { push: jest.fn() },
      title: 'Test Title',
      id: 1000,
      mp4Link: 'https://test.local/file.mp4',
      captions: { link: 'https://test.local/captions.srt' },
      parentCategory: 'clyfford-still-basics',
      parentCategoryTitle: 'Clyfford Still Basics',
      indexInCategory: 0,
      allVideosInCategory: [],
      isPlaying: true,
      volume: 60,
      currentTime: 30,
      duration: 120,
      showCaptions: true,
      showControls: true,
      setCurrentVideoID: jest.fn(),
      playPauseVideo: jest.fn(),
      updateProgress: jest.fn(),
      handleVolumeChange: jest.fn(),
      toggleControls: jest.fn(),
      toggleCaptions: jest.fn(),
    };

    beforeEach(() => {
      wrapper = shallow(<VideoScreen {...mockProps} />);
    });

    it('renders without crashing', () => {
      wrapper.find('div');
    });
  });
});
