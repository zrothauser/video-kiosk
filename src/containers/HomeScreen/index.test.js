// Dependencies
import React from 'react';
import { shallow } from 'enzyme';

// Component to test
import { HomeScreen } from './index';

describe('containers', () => {
  describe('HomeScreen', () => {
    let wrapper;
    const mockProps = {
      categories: [],
      isLoading: true,
      isErrored: false,
      error: null,
      backgroundVideoID: 1000,
      fetchAppData: jest.fn(),
    };

    beforeEach(() => {
      wrapper = shallow(<HomeScreen {...mockProps} />);
    });

    it('renders without crashing', () => {
      wrapper.find('div');
    });
  });
});
