// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

// Styles
import './index.css';

const Header = props => (
  <header className="b-header">
    <h1 className="b-header__title">
      <Link
        to="/"
        className="b-header__link"
      >
        Clyfford Still Museum Media Channel
      </Link>
    </h1>

    <span className="b-header__index">
      <button
        onClick={() => props.toggleVideoIndex()}
        className="b-header__link"
      >
        Video Index
      </button>
    </span>
  </header>
);

Header.propTypes = {
  toggleVideoIndex: PropTypes.func.isRequired,
};

export default Header;
