import React from 'react';
import { shallow } from 'enzyme';
import VideoThumbnail from './index';

describe('components', () => {
  describe('VideoThumbnail', () => {
    it('renders without crashing', () => {
      shallow(<VideoThumbnail />);
    });
  });
});
