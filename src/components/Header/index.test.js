import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('components', () => {
  describe('Header', () => {
    it('renders without crashing', () => {
      const mockProps = {
        toggleVideoIndex: jest.fn(),
        closeVideoIndex: jest.fn(),
        visible: true,
        homeURL: 'https://video.clyffordstillmuseum.org',
      };

      shallow(<Header {...mockProps} />);
    });
  });
});
