import React from 'react';
import { shallow } from 'enzyme';
import MainMenu from './index';

describe('components', () => {
  describe('MainMenu', () => {
    it('renders without crashing', () => {
      const mockProps = {
        isLoading: false,
        categories: [],
      };

      shallow(<MainMenu {...mockProps} />);
    });
  });
});
