import React from 'react';
import { shallow } from 'enzyme';
import VideoControls from './index';

describe('components', () => {
  describe('VideoControls', () => {
    it('renders without crashing', () => {
      const mockProps = {
        title: 'Test Title',
      };

      shallow(<VideoControls {...mockProps} />);
    });
  });
});
