// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import Transition from 'react-transition-group/Transition';

// Styles/Resources
import './index.css';
import PlayButtonSVG from '../../resources/icons/play.svg';
import PauseButtonSVG from '../../resources/icons/pause.svg';

// Transition
import * as transitions from '../transitions';

const {
  durations,
  layerAStyles,
} = transitions;

class PlayPauseButton extends React.Component {
  static renderPlayButton() {
    return (
      <img src={PlayButtonSVG} alt="Play" />
    );
  }

  static renderPauseButton() {
    return (
      <img src={PauseButtonSVG} alt="Pause" />
    );
  }

  render() {
    const {
      isPlaying,
      togglePlay,
      visible,
    } = this.props;

    // Build content
    let buttonContent;

    if (isPlaying) {
      buttonContent = PlayPauseButton.renderPauseButton();
    } else {
      buttonContent = PlayPauseButton.renderPlayButton();
    }

    return (
      <Transition
        in={visible}
        timeout={durations.medium}
      >
        {state => (
          <button
            className="b-play-pause-button"
            onClick={() => togglePlay(!isPlaying)}
            style={{
              ...layerAStyles.default,
              ...layerAStyles[state],
            }}
          >
            {buttonContent}
          </button>
        )}
      </Transition>
    );
  }
}

PlayPauseButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default PlayPauseButton;
