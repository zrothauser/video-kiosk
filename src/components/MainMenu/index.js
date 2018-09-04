// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Helpers
import { getCategoryURL } from '../../utils/navigation';


// Styles
import './index.css';

const MainMenu = (props) => {
  const {
    categories,
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
              to={getCategoryURL(category.slug)}
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
};

export default MainMenu;
