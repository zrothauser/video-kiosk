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
  scrub(event) {
    const {
      handleSeek,
      minimum,
      maximum,
    } = this.props;

    console.log('handle seek');

    // A mousemove could trigger this function, so check if we're
    // actually clicking or scrubbing
    if (!this.state.isMousedown) {
      return;
    }

    const progressBarClientRect = this.trackElement.getBoundingClientRect();
    const mouseX = event.pageX - progressBarClientRect.left;
    const progressBarWidth = progressBarClientRect.width;
    const percent = (mouseX / progressBarWidth);

    let newValue = percent * (maximum - minimum);

    console.log('seeking to: ', newValue);

    // Rounding based on the cursor position could cause
    // the value to go over or under the min/max, so don't
    // let that happen
    if (newValue > maximum) {
      newValue = maximum;
    } else if (newValue < minimum) {
      newValue = minimum;
    }

    handleSeek(newValue);
  }

  /**
   * Lets us track if the mouse is down or up, so that we can scrub the slider.
   *
   * @param {Event} event      Could be a mouseover, mousedown, or change event.
   */
  handleMouseDown() {
    console.log('handleMouseDown');
    this.setState({ isMousedown: true });
  }

  /**
   * Lets us track if the mouse is down or up, so that we can scrub the slider.
   *
   * @param {Event} event      Could be a mouseover, mousedown, or change event.
   */
  handleMouseUp(event) {
    console.log('handleMouseUp');
    this.setState({ isMousedown: false });
    this.scrub(event);
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
        <div
          className="b-slider__track"
          ref={(trackElement) => { this.trackElement = trackElement; }}
          onMouseDown={event => this.handleMouseDown(event)}
          onMouseUp={event => this.handleMouseUp(event)}
          onMouseMove={event => this.scrub(event)}
        />

        <div
          className="b-slider__progress"
          style={{ width: `${valuePercent}%` }}
        />

        <div
          className="b-slider__thumb"
          onMouseDown={event => this.handleMouseDown(event)}
          onMouseUp={event => this.handleMouseUp(event)}
          onMouseMove={event => this.scrub(event)}
          style={{ left: `${valuePercent}%` }}
          role="slider"
          aria-valuemax={maximum}
          aria-valuemin={minimum}
          aria-valuenow={value}
          tabIndex="0"
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
