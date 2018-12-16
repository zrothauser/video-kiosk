import React from 'react';
import { shallow } from 'enzyme';
import { VideoIndex } from './index';

describe('containers', () => {
  describe('HomeScreen', () => {
    it('renders without crashing', () => {
      const mockProps = {
        videos: [],
        toggleVideoIndex: jest.fn(),
        visible: true,
      };

      shallow(<VideoIndex {...mockProps} />);
    });
  });
});
