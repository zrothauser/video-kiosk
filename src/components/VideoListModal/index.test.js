import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import VideoListModal from './index';

describe('components', () => {
  describe('VideoListModal', () => {
    const mockProps = {
      videos: [],
      toggleVideoIndex: jest.fn(),
      visible: true,
    };

    it('renders without crashing', () => {
      shallow(<VideoListModal {...mockProps} />);
    });

    it('renders correctly', () => {
      const VideoListModalComponent = renderer.create(
        <Router>
          <VideoListModal {...mockProps} />
        </Router>,
      );

      expect(VideoListModalComponent).toMatchSnapshot();
    });
  });
});
