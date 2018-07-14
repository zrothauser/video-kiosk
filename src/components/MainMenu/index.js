// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './index.css';

const MainMenu = (props) => {
  const {
    categories,
    setSlug,
  } = props;

  return (
    <div className="b-main-menu">
      <span className="h-screen-reader">
        Main Menu
      </span>
      <ul className="b-main-menu__list">
        {categories.map((category, index) => (
          <li
            className="b-main-menu__item"
            key={category.slug}
          >
            <Link
              to={`/${setSlug}/${category.slug}`}
              className="b-main-menu__link"
              style={{
                animation: `pulse ${categories.length * 3}s infinite`,
                animationDelay: `${index * 3}s`,
              }}
            >
              {category.title}
            </Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

MainMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
  setSlug: PropTypes.string.isRequired,
};

export default MainMenu;
