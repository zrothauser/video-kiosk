// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles/Resources
import './index.css';
import PlayButtonSVG from '../../resources/icons/play.svg';
import PauseButtonSVG from '../../resources/icons/pause.svg';

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
    } = this.props;

    // Build content
    let buttonContent;

    if (isPlaying) {
      buttonContent = PlayPauseButton.renderPauseButton();
    } else {
      buttonContent = PlayPauseButton.renderPlayButton();
    }

    return (
      <button
        className="b-play-pause-button"
        onClick={() => togglePlay(!isPlaying)}
      >
        {buttonContent}
      </button>
    );
  }
}

PlayPauseButton.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  togglePlay: PropTypes.func.isRequired,
};

export default PlayPauseButton;
