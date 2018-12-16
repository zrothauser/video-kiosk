import React from 'react';
import { shallow } from 'enzyme';
import VideoPlayer from './index';

describe('components', () => {
  describe('VideoPlayer', () => {
    it('renders without crashing', () => {
      const mockProps = {
        isPlaying: true,
        mp4Link: 'https://file.local/video.mp4',
        captions: { link: 'https://file.local/captions.srt' },
        title: 'Video Title',
        parentCategory: 'clyfford-still-basics',
        parentCategoryTitle: 'Clyfford Still Basics',
        duration: 60,
        currentTime: 30,
        indexInCategory: 0,
        allVideosInCategory: [],
        togglePlay: jest.fn(),
        volume: 60,
        showControls: true,
        showCaptions: true,
        updateProgress: jest.fn(),
        handleVolumeChange: jest.fn(),
        toggleControls: jest.fn(),
        toggleCaptions: jest.fn(),
      };

      shallow(<VideoPlayer {...mockProps} />);
    });
  });
});
