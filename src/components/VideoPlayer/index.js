// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import PlayPauseButton from '../PlayPauseButton';
import VideoControls from '../VideoControls';

// Styles
import './index.css';

const VideoPlayer = (props) => {
  const {
    isPlaying,
    poster,
    mp4Link,
    // volume,
    title,
    // duration,
    // currentTime,
    parentCategory,
    indexInCategory,
    otherVideos,
    togglePlay,
  } = props;

  return (
    <div className="b-video-player">
      <PlayPauseButton
        isPlaying={isPlaying}
        togglePlay={togglePlay}
      />

      <div className="b-video-player__wrapper">
        <video
          className="b-video-player__video"
          autoPlay
          poster={poster}
          src={mp4Link}
        >
          <track kind="captions" src="sampleSubtitles_en.vtt" srcLang="en" />
        </video>
      </div>

      <VideoControls
        title={title}
        parentCategory={parentCategory}
        indexInCategory={indexInCategory}
        otherVideos={otherVideos}
      />
    </div>
  );
};

VideoPlayer.defaultProps = {
  isPlaying: false,
  poster: null,
  mp4Link: null,
  title: '',
  parentCategory: '',
  indexInCategory: 0,
  otherVideos: [],
};

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool,
  poster: PropTypes.string,
  mp4Link: PropTypes.string,
  title: PropTypes.string,
  parentCategory: PropTypes.string,
  indexInCategory: PropTypes.number,
  otherVideos: PropTypes.arrayOf(PropTypes.object),
  togglePlay: PropTypes.func.isRequired,
};

export default VideoPlayer;
