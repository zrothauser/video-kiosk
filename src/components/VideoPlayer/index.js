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
    volume,
    title,
    // duration,
    // currentTime,
    parentCategory,
    parentCategoryTitle,
    indexInCategory,
    allVideosInCategory,
    togglePlay,
    showControls,
  } = props;

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
          className="b-video-player__video"
          autoPlay
          poster={poster}
          src={mp4Link}
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
          />
        </div>
      }
    </div>
  );
};

VideoPlayer.propTypes = {
  isPlaying: PropTypes.bool.isRequired,
  poster: PropTypes.string.isRequired,
  mp4Link: PropTypes.string.isRequired,
  title: PropTypes.string.isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  indexInCategory: PropTypes.number.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  togglePlay: PropTypes.func.isRequired,
  volume: PropTypes.number.isRequired,
  showControls: PropTypes.bool.isRequired,
};

export default VideoPlayer;
