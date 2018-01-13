import React from 'react';
import { shallow } from 'enzyme';
import Header from './index';

describe('components', () => {
  describe('Header', () => {
    it('renders without crashing', () => {
      shallow(<Header />);
    });
  });
});
