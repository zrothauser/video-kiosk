import React from 'react';
import { shallow } from 'enzyme';
import PlayPauseButton from './index';

describe('components', () => {
  describe('PlayPauseButton', () => {
    it('renders without crashing', () => {
      const mockProps = {
        isPlaying: true,
      };

      shallow(<PlayPauseButton {...mockProps} />);
    });
  });
});