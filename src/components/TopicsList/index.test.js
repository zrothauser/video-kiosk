import React from 'react';
import { shallow } from 'enzyme';
import TopicsList from './index';

describe('components', () => {
  describe('MainMenu', () => {
    it('renders without crashing', () => {
      shallow(<TopicsList />);
    });
  });
});
