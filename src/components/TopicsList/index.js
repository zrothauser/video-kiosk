// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './index.css';

const TopicsList = props => (
  <div className="b-topics-list">
    <h2 className="b-topics-list__title">
      Topics
    </h2>
    <ul className="b-topics-list__list">
      {props.categories.map((category) => {
        // Build classes for the link, so we can mark the active one
        const linkClasses = ['b-topics-list__link'];

        if (props.selectedCategorySlug === category.slug) {
          linkClasses.push('b-topics-list__link--selected');
        }

        // And return the list item markup
        return (
          <li
            className="b-topics-list__item"
            key={category.slug}
          >
            <Link
              to={`/category/${category.slug}`}
              className={linkClasses.join(' ')}
            >
              {category.title}
            </Link>
          </li>
        );
      })}
    </ul>
  </div>
);

TopicsList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  selectedCategorySlug: PropTypes.string.isRequired,
};

export default TopicsList;
