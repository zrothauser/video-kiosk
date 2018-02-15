// Disable this a11y file, we'll have captions anyway but
// not until they're loaded from the API
/* eslint-disable jsx-a11y/media-has-caption */

// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import PlayPauseButton from '../PlayPauseButton';
import VideoControls from '../VideoControls';

// Styles
import './index.css';

class VideoPlayer extends React.Component {
  constructor(props) {
    super(props);

    // Binding
    this.seek = this.seek.bind(this);
    this.handleLoad = this.handleLoad.bind(this);
    this.handlePlay = this.handlePlay.bind(this);
    this.handlePause = this.handlePause.bind(this);
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.hideControls = this.hideControls.bind(this);
    this.showControls = this.showControls.bind(this);

    // Initial state
    this.state = {
      controlsTimer: null,
      progressTrackerAnimationFrame: null,
    };
  }

  /**
   * Show captions if needed.
   */
  componentDidUpdate(prevProps) {
    const {
      isPlaying,
      volume,
      showCaptions,
      mp4Link,
    } = this.props;

    // If we don't have a video rendered yet, don't do anything
    if (!this.videoElement) {
      return;
    }

    // If we need to pause or play the video, do that now
    if (mp4Link) {
      if (isPlaying && this.videoElement.paused) {
        this.videoElement.play();
      } else if (!isPlaying && !this.videoElement.paused) {
        this.videoElement.pause();
      }
    }

    // Update the volume, if needed
    if (prevProps.volume !== volume) {
      this.applyVideoVolume();
    }

    // If captions should be shown, and they exist, show them
    if (this.videoElement.textTracks.length) {
      if (showCaptions) {
        this.videoElement.textTracks[0].mode = 'showing';
      } else {
        this.videoElement.textTracks[0].mode = 'hidden';
      }
    }
  }

  /**
   * Clear the animation frame before unmounting.
   */
  componentWillUnmount() {
    // Stop the timer that shows/hides controls
    this.cancelControlsTimer();

    // Stop keeping track of the time
    this.cancelProgressTracker();

    // Update the state of the video player
    this.props.togglePlay(false);
  }

  /**
   * For keeping track of the video's progress.
   */
  setProgress() {
    const {
      isPlaying,
      updateProgress,
    } = this.props;

    // Don't do anything if we don't have a video player rendered yet
    if (!this.videoElement) {
      return;
    }

    // Keep track of the current time in the store
    updateProgress(this.videoElement.currentTime);

    // Call recursively as long as we're still playing
    if (isPlaying) {
      this.setState({
        progressTrackerAnimationFrame: window.requestAnimationFrame(this.setProgress),
      });
    }
  }

  /**
   * Lets us set the track position.
   *
   * @param int time Time in seconds.
   */
  seek(time) {
    this.videoElement.currentTime = time;
    this.setProgress();
  }

  /**
   * Sets the 'volume' prop to the video element.
   *
   * This is necessary because there isn't an HTML
   * attribute that can be set on the <video> element
   * to control its volume, so we can't set this in a
   * declarative way.
   */
  applyVideoVolume() {
    // Skip if we don't have an element rendered yet
    if (!this.videoElement) {
      return;
    }

    this.videoElement.volume = (this.props.volume / 100);
  }

  /**
   * Cancels the animation frame - stops keeping track of the current time.
   */
  cancelProgressTracker() {
    window.cancelAnimationFrame(this.state.progressTrackerAnimationFrame);
    this.setState({ progressTrackerAnimationFrame: null });
  }

  /**
   * Hides the controls, controlled by the timer.
   */
  hideControls() {
    this.props.toggleControls(false);
  }

  /**
   * Shows the controls, controlled by the timer.
   */
  showControls() {
    this.props.toggleControls(true);
  }

  /**
   * Handles internal timer state, for showing/hiding controls.
   */
  resetControlsTimer() {
    clearTimeout(this.state.controlsTimer);
    this.setState({ controlsTimer: setTimeout(this.hideControls, 3000) });
  }

  /**
   * Cancels the timer that shows/hides the controls,
   * either called when unmounting the Player or when the video
   * is paused
   */
  cancelControlsTimer() {
    // Stop keeping track of the time
    clearTimeout(this.state.controlsTimer);

    // Remove the timer from state
    this.setState({ controlsTimer: null });
  }

  /**
   * Shows controls and resets the timer when the mouse moves.
   */
  mouseMoveHandler() {
    // Return if the video isn't playing, this
    // doesn't matter when it's paused
    if (!this.props.isPlaying) {
      return;
    }

    this.showControls();
    this.resetControlsTimer();
  }

  /**
   * Updates state and plays the video once it's ready.
   */
  handleLoad() {
    // Sets the volume, because we can't do that declaratively
    this.applyVideoVolume();

    // And play the video
    this.props.togglePlay(true);

    // Reset the controls timer
    this.resetControlsTimer();
  }

  /**
   * Event handler for when the video begins playing.
   */
  handlePlay() {
    // Keep track of progress
    this.setProgress();

    // Start the timer for toggling the controls
    this.resetControlsTimer();
  }

  /**
   * Event handler for when the video begins playing.
   */
  handlePause() {
    // Cancel the timer that shows/hides controls
    this.cancelControlsTimer();
  }

  /**
   * Event handler for when the video finishes playing.
   */
  handleOnEnd() {
    // Stop the timer
    this.cancelProgressTracker();

    // And go back to the Topic screen
    this.props.navigateToTopic();
  }

  render() {
    const {
      isPlaying,
      mp4Link,
      captions,
      volume,
      title,
      duration,
      currentTime,
      parentCategory,
      parentCategoryTitle,
      indexInCategory,
      allVideosInCategory,
      togglePlay,
      showControls,
      showVolumeControl,
      handleVolumeChange,
      toggleVolumeControl,
      toggleCaptions,
    } = this.props;

    const captionSource = captions.link ? captions.link : null;

    return (
      <div
        className="b-video-player"
        onMouseMove={() => this.mouseMoveHandler()}
        onTouchStart={() => this.mouseMoveHandler()}
        onClick={() => this.mouseMoveHandler()}
      >
        <PlayPauseButton
          isPlaying={isPlaying}
          togglePlay={togglePlay}
          visible={showControls}
        />

        <div className="b-video-player__wrapper">
          <video
            ref={(videoElement) => { this.videoElement = videoElement; }}
            className="b-video-player__video"
            autoPlay={false}
            src={mp4Link}
            onCanPlay={this.handleLoad}
            onPlay={this.handlePlay}
            onPause={this.handlePause}
            onEnded={this.handleOnEnd}
            crossOrigin="anonymous"
          >
            {captionSource &&
              <track
                kind="captions"
                src={captionSource}
                srcLang="en"
              />
            }
          </video>
        </div>

        <div className="b-video-player__controls-wrapper">
          <VideoControls
            title={title}
            parentCategory={parentCategory}
            parentCategoryTitle={parentCategoryTitle}
            indexInCategory={indexInCategory}
            allVideosInCategory={allVideosInCategory}
            hasCaptions={!!captions.link}
            showVolumeControl={showVolumeControl}
            volume={volume}
            currentTime={currentTime}
            duration={duration}
            handleSeek={time => this.seek(time)}
            handleVolumeChange={handleVolumeChange}
            toggleVolumeControl={toggleVolumeControl}
            toggleCaptions={toggleCaptions}
            visible={showControls}
          />
        </div>
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  mp4Link: PropTypes.string.isRequired,
  captions: PropTypes.shape({ link: PropTypes.string }).isRequired,
  title: PropTypes.string.isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  indexInCategory: PropTypes.number.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  togglePlay: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  showControls: PropTypes.bool.isRequired,
  showVolumeControl: PropTypes.bool.isRequired,
  showCaptions: PropTypes.bool.isRequired,
  updateProgress: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  toggleVolumeControl: PropTypes.func.isRequired,
  toggleControls: PropTypes.func.isRequired,
  toggleCaptions: PropTypes.func.isRequired,
  navigateToTopic: PropTypes.func.isRequired,
};

export default VideoPlayer;
