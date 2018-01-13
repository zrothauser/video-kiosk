// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const MainMenu = props => (
  <div>
    <span>Main Menu</span>
    {props.categories.map(category => (
      <Link
        to={`/category/${category.slug}`}
        key={`/category/${category.slug}`}
      >
        {category.title}
      </Link>
    ))}
  </div>
);

MainMenu.propTypes = {
  categories: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default MainMenu;
