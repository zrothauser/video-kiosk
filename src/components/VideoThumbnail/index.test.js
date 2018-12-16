import React from 'react';
import { shallow } from 'enzyme';
import VideoThumbnail from './index';

describe('components', () => {
  describe('VideoThumbnail', () => {
    it('renders without crashing', () => {
      const mockProps = {
        id: 1000,
        title: 'Video Title',
        description: 'Video Description',
        thumbnail: 'https://file.local/thumbnail.jpg',
        duration: 120,
        categorySlug: 'clyfford-still-basics',
      };

      shallow(<VideoThumbnail {...mockProps} />);
    });
  });
});
