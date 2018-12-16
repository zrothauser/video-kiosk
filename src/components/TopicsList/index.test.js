import React from 'react';
import { BrowserRouter as Router } from 'react-router-dom';

import renderer from 'react-test-renderer';
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

    it('renders correctly', () => {
      const TopicsListComponent = renderer.create(
        <Router>
          <TopicsList {...mockProps} />
        </Router>,
      );

      expect(TopicsListComponent).toMatchSnapshot();
    });
  });
});
