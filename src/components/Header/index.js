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

const Header = props => (
  <Transition
    in={props.visible}
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
            to={props.homeURL}
            className="b-header__link"
            onClick={() => props.closeVideoIndex()}
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
