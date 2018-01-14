import React from 'react';
import { shallow } from 'enzyme';
import TopicsList from './index';

describe('components', () => {
  describe('MainMenu', () => {
    const mockProps = {
      selectedCategorySlug: 'clyfford-still-basics',
      categories: [
        {
          slug: 'clyfford-still-basics',
          title: 'Clyfford Still Basics',
        },
        {
          slug: 'go-deeper',
          title: 'Go Deeper',
        },
        {
          slug: 'from-the-archives',
          title: 'From the Archives',
        },
      ],
    };

    it('renders without crashing', () => {
      shallow(<TopicsList {...mockProps} />);
    });
  });
});
