import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoThumbnail from './index';

describe('components', () => {
  describe('VideoThumbnail', () => {
    const mockProps = {
      id: 1000,
      title: 'Video Title',
      description: 'Video Description',
      thumbnail: 'https://file.local/thumbnail.jpg',
      duration: 120,
      categorySlug: 'clyfford-still-basics',
    };

    it('renders without crashing', () => {
      shallow(<VideoThumbnail {...mockProps} />);
    });

    it('renders correctly', () => {
      const VideoThumbnailComponent = renderer.create(
        <Router>
          <VideoThumbnail {...mockProps} />
        </Router>,
      );

      expect(VideoThumbnailComponent).toMatchSnapshot();
    });
  });
});
