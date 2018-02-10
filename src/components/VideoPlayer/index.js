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
    this.handleOnEnd = this.handleOnEnd.bind(this);
    this.setProgress = this.setProgress.bind(this);
    this.hideControls = this.hideControls.bind(this);
    this.showControls = this.showControls.bind(this);

    // Initial state
    this.state = { timer: null };
  }

  /**
   * Show captions if needed.
   */
  componentDidUpdate(prevProps) {
    const {
      isPlaying,
      volume,
      showCaptions,
    } = this.props;

    // If we don't have a video rendered yet, don't do anything
    if (!this.videoElement) {
      return;
    }

    // If we need to pause or play the video, do that now
    if (prevProps.isPlaying !== isPlaying) {
      if (isPlaying && this.videoElement.paused) {
        this.videoElement.play();
      } else if (!this.videoElement.paused) {
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
    clearTimeout(this.state.timer);
    this.clearAnimationFrame();
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
      this.animationFrame = window.requestAnimationFrame(this.setProgress);
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
   * Cancels the animation frame.
   */
  clearAnimationFrame() {
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
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
  resetTimer() {
    clearTimeout(this.state.timer);
    this.setState({ timer: setTimeout(this.hideControls, 3000) });
  }

  /**
   * Shows controls and resets the timer when the mouse moves.
   */
  mouseMoveHandler() {
    this.showControls();
    this.resetTimer();
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
    this.resetTimer();
  }

  /**
   * Event handler for when the video begins playing.
   */
  handlePlay() {
    this.setProgress();
  }

  /**
   * Event handler for when the video finishes playing.
   */
  handleOnEnd() {
    this.clearAnimationFrame();
  }

  render() {
    const {
      isPlaying,
      poster,
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
      >
        {showControls &&
          <PlayPauseButton
            isPlaying={isPlaying}
            togglePlay={togglePlay}
          />
        }

        <div className="b-video-player__wrapper">
          <video
            ref={(videoElement) => { this.videoElement = videoElement; }}
            className="b-video-player__video"
            autoPlay={false}
            poster={poster}
            src={mp4Link}
            onCanPlay={this.handleLoad}
            onPlay={this.handlePlay}
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

        {showControls &&
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
            />
          </div>
        }
      </div>
    );
  }
}

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
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
};

export default VideoPlayer;
