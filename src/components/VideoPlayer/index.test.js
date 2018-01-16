import React from 'react';
import { shallow } from 'enzyme';
import VideoPlayer from './index';

describe('components', () => {
  describe('VideoPlayer', () => {
    it('renders without crashing', () => {
      const mockProps = {
        title: 'Video Title',
      };

      shallow(<VideoPlayer {...mockProps} />);
    });
  });
});
