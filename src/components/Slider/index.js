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

    // Binding
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleDrag = this.handleDrag.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);

    // Initial state
    this.state = {
      currentValue: props.value,
      isMouseDown: false,
    };
  }

  /**
   * If the video time has changed, reset our internal state.
   */
  componentWillReceiveProps(nextProps) {
    // Return if nothing changed
    if (nextProps.value === this.state.currentValue) {
      return;
    }

    // Don't update the value if we're dragging
    if (this.state.isMouseDown) {
      return;
    }

    this.setState({ currentValue: nextProps.value });
  }

  /**
   * Lets us track if the mouse is down or up, so that we can scrub the slider.
   *
   * @param {Event} event Mousedown event.
   */
  handleMouseDown(event) {
    console.log('handleMouseDown');

    this.setState({ isMouseDown: true });

    // Pass to handleDrag(), so that we can go
    // ahead and update the position
    this.handleDrag(event);

    // Watch for the mouse move, until the dragging is done
    document.addEventListener('mousemove', this.handleDrag);
    document.addEventListener('touchmove', this.handleDrag);
    document.addEventListener('mouseup', this.handleMouseUp);
    document.addEventListener('touchend', this.handleMouseUp);
  }

  /**
   * Update state based on where we're dragging.
   */
  handleDrag(event) {
    const {
      minimum,
      maximum,
    } = this.props;

    console.log('handleDrag');

    if (!this.trackElement) {
      return;
    }

    // Get the progress bar dimensions, and then find
    // where it starts and its width
    const progressBarClientRect = this.trackElement.getBoundingClientRect();
    const progressBarStart = progressBarClientRect.left;
    const progressBarWidth = progressBarClientRect.width;

    // Find the cursor/touch point position: we get different data from
    // touch events than from mouse events
    const mouseX = (event.changedTouches && event.changedTouches.length) ?
      event.changedTouches[0].pageX :
      event.pageX;

    // Calculate distance from the beginning, and get a percent of the total
    // width from that. Then convert to a value based on the minimum and maxium
    // possible values.
    const distanceFromBeginning = mouseX - progressBarStart;
    const percent = (distanceFromBeginning / progressBarWidth);
    let newValue = percent * (maximum - minimum);

    // Rounding based on the cursor position could cause
    // the value to go over or under the min/max, so don't
    // let that happen
    if (newValue > maximum) {
      newValue = maximum;
    } else if (newValue < minimum) {
      newValue = minimum;
    }

    console.log('newValue: ' + newValue);

    this.setState({ currentValue: newValue });
  }

  /**
   * Lets us track if the mouse is down or up, so that we can scrub the slider.
   *
   * @param {Event} event      Could be a mouseover, mousedown, or change event.
   */
  handleMouseUp() {
    const { handleSeek } = this.props;
    const { currentValue } = this.state;

    this.setState({ isMouseDown: false });

    // Remove event handlers
    document.removeEventListener('mousemove', this.handleDrag);
    document.removeEventListener('touchmove', this.handleDrag);
    document.removeEventListener('mouseup', this.handleMouseUp);
    document.removeEventListener('touchend', this.handleMouseUp);

    // Call the handleSeek prop, this will probably actually
    // do something with the data now that it's done being set
    console.log('about to handleSeek: ' + currentValue);
    handleSeek(currentValue);
  }

  render() {
    const {
      minimum,
      maximum,
    } = this.props;

    const { currentValue } = this.state;

    const valuePercent = ((currentValue - minimum) / (maximum - minimum)) * 100;

    return (
      <div className="b-slider">
        <div
          className="b-slider__track"
          ref={(trackElement) => { this.trackElement = trackElement; }}
          onMouseDown={event => this.handleMouseDown(event)}
          onTouchStart={event => this.handleMouseDown(event)}
        >
          <div
            className="b-slider__progress"
            style={{ width: `${valuePercent}%` }}
          />
        </div>

        <div
          className="b-slider__thumb"
          style={{ left: `${valuePercent}%` }}
          role="slider"
          aria-valuemax={maximum}
          aria-valuemin={minimum}
          aria-valuenow={currentValue}
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
