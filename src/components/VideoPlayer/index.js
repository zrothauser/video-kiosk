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
  }

  /**
   * Updates the video element's state if necessary.
   *
   * @param {Object} newProps New values for props.
   */
  componentWillReceiveProps(newProps) {
    // If we don't have a video rendered yet, don't do anything
    if (!this.videoElement) {
      return;
    }

    // If we need to pause or play the video, do that now
    if (this.props.isPlaying !== newProps.isPlaying) {
      if (newProps.isPlaying && this.videoElement.paused) {
        this.videoElement.play();
      } else if (!this.videoElement.paused) {
        this.videoElement.pause();
      }
    }

    // Update the volume, if needed
    if (this.props.volume !== newProps.volume) {
      this.applyVideoVolume();
    }
  }

  /**
   * Clear the animation frame before unmounting.
   */
  componentWillUnmount() {
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
    console.log(`Seeking to time: ${time}`);
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
    } = this.props;

    return (
      <div className="b-video-player">
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
          >
            <track kind="captions" src="sampleSubtitles_en.vtt" srcLang="en" />
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
              hasCaptions
              showVolumeControl={showVolumeControl}
              volume={volume}
              currentTime={currentTime}
              duration={duration}
              handleSeek={time => this.seek(time)}
              handleVolumeChange={handleVolumeChange}
              toggleVolumeControl={toggleVolumeControl}
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
  updateProgress: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  toggleVolumeControl: PropTypes.func.isRequired,
};

export default VideoPlayer;
