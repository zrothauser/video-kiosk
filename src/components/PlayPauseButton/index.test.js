import React from 'react';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import PlayPauseButton from './index';

describe('components', () => {
  describe('PlayPauseButton', () => {
    const mockProps = {
      isPlaying: true,
      togglePlay: jest.fn(),
      visible: true,
    };

    it('renders without crashing', () => {
      shallow(<PlayPauseButton {...mockProps} />);
    });

    it('renders correctly', () => {
      const PlayPauseButtonComponent = renderer.create(
        <PlayPauseButton {...mockProps} />,
      );

      expect(PlayPauseButtonComponent).toMatchSnapshot();
    });
  });
});
