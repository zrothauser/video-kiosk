// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './index.css';

/**
 * Generic slider class that can be styled and used
 * anywhere we need a range input or scrubber.
 *
 * This will be used as both the video's progress bar and
 * the audio controls.
 */
class Slider extends React.Component {
  constructor(props) {
    super(props);
    this.state = { isMousedown: false };
  }

  /**
   * Jump to a time based on the click or scrubbing on the progress bar.
   *
   * @param {Event} event Could be a mouseover, mousedown, or change event.
   */
  onSeek(event) {
    const {
      handleSeek,
      minimum,
      maximum,
    } = this.props;

    // A mousemove could trigger this function, so check if we're
    // actually clicking or scrubbing
    if (!this.state.isMousedown) {
      return;
    }

    const progressBarClientRect = this.rangeSlider.getBoundingClientRect();
    const mouseX = event.pageX - progressBarClientRect.left;
    const progressBarWidth = progressBarClientRect.width;
    const percent = (mouseX / progressBarWidth);

    const newValue = percent * (maximum - minimum);
    // console.log('new Value: ', newValue);

    handleSeek(newValue);
  }

  /**
   * Lets us track if the mouse is down or up, so that we can scrub the slider.
   *
   * @param {bool} isMousedown True if mousedown, false if mouseup.
   * @param {Event} event      Could be a mouseover, mousedown, or change event.
   */
  setMousedown(isMousedown, event) {
    this.setState({ isMousedown });
    this.onSeek(event);
  }

  render() {
    const {
      minimum,
      maximum,
      value,
    } = this.props;

    const valuePercent = ((value - minimum) / (maximum - minimum)) * 100;

    return (
      <div className="b-slider">
        <div className="b-slider__track" />

        <div
          className="b-slider__progress"
          style={{ width: `${valuePercent}%` }}
        />

        <div
          className="b-slider__thumb"
          onClick={event => this.onSeek(event, true)}
          onKeyPress={event => this.onSeek(event, true)}
          style={{ left: `${valuePercent}%` }}
          role="slider"
          aria-valuemax={maximum}
          aria-valuemin={minimum}
          aria-valuenow={value}
          tabIndex="0"
        />

        <input
          ref={(rangeSlider) => { this.rangeSlider = rangeSlider; }}
          className="b-slider__input"
          type="range"
          min="0"
          max={`${maximum}`}
          step="1"
          value={value}
          onMouseMove={event => this.onSeek(event)}
          onMouseDown={event => this.setMousedown(true, event)}
          onMouseUp={event => this.setMousedown(false, event)}
        />
      </div>
    );
  }
}

Slider.propTypes = {
  minimum: PropTypes.number.isRequired,
  maximum: PropTypes.number.isRequired,
  value: PropTypes.number.isRequired,
  handleSeek: PropTypes.func.isRequired,
};

export default Slider;
