// Dependencies
import React from 'react';
import Enzyme, { shallow } from 'enzyme';
import Adapter from 'enzyme-adapter-react-16';

// Component to test
import { CategoryScreen } from './index';

Enzyme.configure({ adapter: new Adapter() });

describe('containers', () => {
  describe('CategoryScreen', () => {
    let wrapper;
    const mockProps = {
      title: 'Category Title',
      videos: [],
    };

    beforeEach(() => {
      wrapper = shallow(<CategoryScreen {...mockProps} />);
    });

    it('renders without crashing', () => {
      wrapper.find('div');
    });
  });
});
