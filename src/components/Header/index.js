// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';

// Styles
import './index.css';

const Header = () => (
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
        onClick={() => console.log('clicked Video Index')}
        className="b-header__link"
      >
        Video Index
      </button>
    </span>
  </header>
);

export default Header;
