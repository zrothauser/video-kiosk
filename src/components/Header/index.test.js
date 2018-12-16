import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import Header from './index';

describe('components', () => {
  describe('Header', () => {
    const mockProps = {
      toggleVideoIndex: jest.fn(),
      closeVideoIndex: jest.fn(),
      visible: true,
      homeURL: 'https://video.clyffordstillmuseum.org',
    };

    it('renders without crashing', () => {
      shallow(<Header {...mockProps} />);
    });

    it('renders correctly', () => {
      const HeaderComponent = renderer.create(
        <Router>
          <Header {...mockProps} />
        </Router>,
      );

      expect(HeaderComponent).toMatchSnapshot();
    });
  });
});
