import React from 'react';
import { shallow } from 'enzyme';
import VideoGrid from './index';

describe('components', () => {
  describe('VideoGrid', () => {
    it('renders without crashing', () => {
      const mockProps = {
        videos: []
      };

      shallow(<VideoGrid {...mockProps} />);
    });
  });
});
