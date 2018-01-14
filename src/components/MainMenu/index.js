// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './index.css';

const MainMenu = (props) => {
  const { categories } = props;

  return (
    <div className="b-main-menu">
      <span className="h-screen-reader">
        Main Menu
      </span>
      <ul className="b-main-menu__list">
        {categories.map((category, index) => (
          <li
            className="b-main-menu__item"
            key={`${index}-${category.slug}`}
          >
            <Link
              to={`/category/${category.slug}`}
              className="b-main-menu__link"
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  )
};

MainMenu.propTypes = {
  isLoading: PropTypes.bool.isRequired,
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainMenu;
