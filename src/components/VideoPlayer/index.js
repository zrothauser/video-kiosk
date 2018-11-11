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
    this.handleMouseDown = this.handleMouseDown.bind(this);
    this.handleMouseUp = this.handleMouseUp.bind(this);
    this.handleVideoClick = this.handleVideoClick.bind(this);

    // Initial state
    this.state = {
      controlsTimer: null,
      progressTrackerAnimationFrame: null,
    };
  }

  /**
   * Control the video element on mount.
   */
  componentDidMount() {
    this.updateVideoElement();
  }

  /**
   * Control the video element or display other DOM elements
   * when needed.
   */
  componentDidUpdate(prevProps) {
    const {
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
      this.updateVideoElement();
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
   * We need to control the video element manually
   * when props change, or on initial component load.
   */
  updateVideoElement() {
    const {
      isPlaying,
    } = this.props;

    if (isPlaying && this.videoElement.paused) {
      const playbackPromise = this.videoElement.play();

      // Handle errors from Playback, which can happen from
      // Safari blocking autoplay videos.
      if (playbackPromise !== undefined) {
        playbackPromise.catch(() => {
          // Auto-play was prevented, stop trying to play it.
          this.props.togglePlay(false);
        }).then(() => {
          // Auto-play started
        });
      }
    } else if (!isPlaying && !this.videoElement.paused) {
      this.videoElement.pause();
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

    if (this.props.isPlaying) {
      this.startOrResetControlsTimer();
    }
  }

  /**
   * Handles internal timer state, for showing/hiding controls.
   */
  startOrResetControlsTimer() {
    clearTimeout(this.state.controlsTimer);
    this.setState({
      controlsTimer: setTimeout(this.hideControls, 4000),
    });
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
   * Keep track of mousedown State
   */
  handleMouseDown() {
    // If the video isn't, the controls timer isn't active, and
    // we don't need to do anything
    if (this.props.isPlaying) {
      this.cancelControlsTimer();
    }
  }

  /**
   * Shows/hides the controls when the mouse is clicked. This happens
   * on MouseUp instead of Click, so that the controls don't show/hide
   * as the user drags/scrubs.
   */
  handleMouseUp() {
    if (this.props.isPlaying) {
      this.startOrResetControlsTimer();
    }
  }

  /**
   * Handles clicks to the actual video element.
   *
   * Clicking on the video itself will directly toggle
   * the video controls.
   */
  handleVideoClick() {
    // If the video is paused, the controls will already be showing
    if (!this.props.isPlaying) {
      return;
    }

    if (this.props.showControls) {
      this.hideControls();
    } else {
      this.showControls();
    }
  }

  /**
   * Updates state and plays the video once it's ready.
   */
  handleLoad() {
    // Sets the volume, because we can't do that declaratively
    this.applyVideoVolume();

    // And play the video
    this.props.togglePlay(true);
  }

  /**
   * Event handler for when the video begins playing.
   */
  handlePlay() {
    // Keep track of progress
    this.setProgress();

    // Start the timer for toggling the controls
    this.startOrResetControlsTimer();
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

    // And go back to the beginning of the video.
    this.seek(0);
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
            onClick={this.handleVideoClick}
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

        <div
          className="b-video-player__controls-wrapper"
          onMouseDown={this.handleMouseDown}
          onMouseUp={this.handleMouseUp}
        >
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
  allVideosInCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
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
};

export default VideoPlayer;
