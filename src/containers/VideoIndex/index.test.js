import React from 'react';
import { shallow } from 'enzyme';
import VideoIndex from './index';

describe('containers', () => {
  describe('HomeScreen', () => {
    it('renders without crashing', () => {
      shallow(<VideoIndex />);
    });
  });
});
