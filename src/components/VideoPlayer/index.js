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
    // If the isPlaying value didn't change, no need to do anything
    if (this.props.isPlaying === newProps.isPlaying) {
      return;
    }

    console.log('componentWillReceiveProps');

    // If we don't have a video rendered yet, don't do anything
    if (!this.videoElement) {
      console.log('no video element');
      return;
    }

    // Play/pause the video
    if (newProps.isPlaying && this.videoElement.paused) {
      console.log('start playing');
      this.videoElement.play();
    } else if (!this.videoElement.paused) {
      console.log('pausing');
      this.videoElement.pause();
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

    const time = this.videoElement.currentTime;
    // console.log(`Current progress: ${time}`);

    updateProgress(time);

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
   * Cancels the animation frame.
   */
  clearAnimationFrame() {
    console.log('clear animation frame');
    window.cancelAnimationFrame(this.animationFrame);
    this.animationFrame = null;
  }

  /**
   * Updates state and plays the video once it's ready.
   */
  handleLoad() {
    this.props.togglePlay(true);
  }

  /**
   * Event handler for when the video begins playing.
   */
  handlePlay() {
    console.log('handle play');
    this.setProgress();
  }

  /**
   * Event handler for when the video finishes playing.
   */
  handleOnEnd() {
    console.log('handle end');
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
              showVolumeControls={false}
              volume={volume}
              currentTime={currentTime}
              duration={duration}
              handleSeek={time => this.seek(time)}
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
};

export default VideoPlayer;
