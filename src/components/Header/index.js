// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

// Transition
import * as transitions from '../transitions';

// Styles
import './index.css';

const {
  durations,
  mediumFadeStyles,
} = transitions;

const Header = ({
  visible,
  homeURL,
  closeVideoIndex,
  toggleVideoIndex,
}) => (
  <Transition
    in={visible}
    timeout={durations.medium}
  >
    {state => (
      <header
        className="b-header"
        style={{
          ...mediumFadeStyles.default,
          ...mediumFadeStyles[state],
        }}
      >
        <h1 className="b-header__title">
          <Link
            to={homeURL}
            className="b-header__link"
            onClick={() => closeVideoIndex()}
          >
            Clyfford Still Museum Video Channel
          </Link>
        </h1>

        <span className="b-header__index">
          <button
            onClick={() => toggleVideoIndex()}
            className="b-header__link"
            type="button"
          >
            Index
          </button>
        </span>
      </header>
    )}
  </Transition>
);

Header.propTypes = {
  toggleVideoIndex: PropTypes.func.isRequired,
  closeVideoIndex: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
  homeURL: PropTypes.string.isRequired,
};

export default Header;
