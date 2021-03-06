import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
import { shallow } from 'enzyme';
import MainMenu from './index';

describe('components', () => {
  describe('MainMenu', () => {
    const mockProps = {
      categories: [],
    };

    it('renders without crashing', () => {
      shallow(<MainMenu {...mockProps} />);
    });

    it('renders correctly', () => {
      const MainMenuComponent = renderer.create(
        <Router>
          <MainMenu {...mockProps} />
        </Router>,
      );

      expect(MainMenuComponent).toMatchSnapshot();
    });
  });
});
