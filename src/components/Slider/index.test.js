import React from 'react';
import renderer from 'react-test-renderer';
import Slider from './index';

describe('components', () => {
  describe('Slider', () => {
    const mockProps = {
      minimum: 0,
      maximum: 200,
      value: 40,
      handleSeek: jest.fn(),
    };

    it('renders correctly', () => {
      const SliderComponent = renderer.create(
        <Slider {...mockProps} />,
      );

      expect(SliderComponent).toMatchSnapshot();
    });
  });
});
