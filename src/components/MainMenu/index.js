// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './index.css';

const MainMenu = props => (
  <div className="b-main-menu">
    <span className="h-screen-reader">
      Main Menu
    </span>
    <ul className="b-main-menu__list">
      {props.categories.map(category => (
        <li className="b-main-menu__item">
          <Link
            to={`/category/${category.slug}`}
            key={`/category/${category.slug}`}
            className="b-main-menu__link"
          >
            {category.title}
          </Link>
        </li>
      ))}
    </ul>
  </div>
);

MainMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainMenu;
