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
      {props.categories.map(category => (
        <li
          className="b-topics-list__item"
          key={category.slug}
        >
          <Link
            to={`/category/${category.slug}`}
            className="b-topics-list__link"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

TopicsList.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default TopicsList;
