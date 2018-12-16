import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoGrid from './index';

describe('components', () => {
  describe('VideoGrid', () => {
    const mockProps = {
      categorySlug: 'clyfford-still-basics',
      videos: [],
    };

    it('renders without crashing', () => {
      shallow(<VideoGrid {...mockProps} />);
    });

    it('renders correctly', () => {
      const VideoGridComponent = renderer.create(
        <Router>
          <VideoGrid {...mockProps} />
        </Router>,
      );

      expect(VideoGridComponent).toMatchSnapshot();
    });
  });
});
