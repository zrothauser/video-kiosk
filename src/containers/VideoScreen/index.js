// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoPlayer from '../../components/VideoPlayer';

// Action types
import * as videoAPIActions from '../../redux/actions/video';
import * as videoPlayerActions from '../../redux/actions/videoPlayer';

export class VideoScreen extends React.Component {
  componentDidMount() {
    const {
      getMP4Data,
      getCaptionData,
      setCurrentVideoID,
    } = this.props;
    const id = parseInt(this.props.match.params.id, 10);

    // Keep track of the current video
    setCurrentVideoID(id);

    // Load additional data
    getMP4Data(id);
    getCaptionData(id);
  }

  render() {
    const {
      title,
      mp4Link,
      captions,
      thumbnailFull,
      playPauseVideo,
      parentCategory,
      parentCategoryTitle,
      indexInCategory,
      allVideosInCategory,
      isPlaying,
      volume,
      currentTime,
      duration,
      showControls,
      showVolumeControl,
      updateProgress,
      handleVolumeChange,
      toggleVolumeControl,
      toggleControls,
    } = this.props;

    return (
      <div>
        <h1 className="h-screen-reader">
          {title}
        </h1>

        <VideoPlayer
          title={title}
          poster={thumbnailFull}
          mp4Link={mp4Link}
          captions={captions}
          togglePlay={playPauseVideo}
          parentCategory={parentCategory}
          parentCategoryTitle={parentCategoryTitle}
          indexInCategory={indexInCategory}
          allVideosInCategory={allVideosInCategory}
          isPlaying={isPlaying}
          volume={volume}
          currentTime={currentTime}
          duration={duration}
          showControls={showControls}
          showVolumeControl={showVolumeControl}
          updateProgress={updateProgress}
          handleVolumeChange={handleVolumeChange}
          toggleVolumeControl={toggleVolumeControl}
          toggleControls={toggleControls}
        />
      </div>
    );
  }
}

VideoScreen.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  mp4Link: PropTypes.string.isRequired,
  thumbnailFull: PropTypes.string.isRequired,
  captions: PropTypes.arrayOf(PropTypes.shape({ uri: PropTypes.string })).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  indexInCategory: PropTypes.number.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  showControls: PropTypes.bool.isRequired,
  showVolumeControl: PropTypes.bool.isRequired,
  getMP4Data: PropTypes.func.isRequired,
  getCaptionData: PropTypes.func.isRequired,
  setCurrentVideoID: PropTypes.func.isRequired,
  playPauseVideo: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  toggleVolumeControl: PropTypes.func.isRequired,
  toggleControls: PropTypes.func.isRequired,
};

// Connect with store
const mapStateToProps = (state, ownProps) => {
  // Get data for this video, if it exists
  const allVideos = state.videos.videos;
  const videoID = parseInt(ownProps.match.params.id, 10);
  const videoData = allVideos.find(video => video.id === videoID);

  // Get anything related to the video player's state
  const {
    playerState,
    interface: interfaceState,
  } = state.videoPlayer;

  // Get the other videos in the category
  let sortedAllVideosInCategory = [];

  if (videoData) {
    const allVideosInCategory = allVideos.filter(video =>
      video.parentCategory === videoData.parentCategory);
    sortedAllVideosInCategory = allVideosInCategory.sort((a, b) => a - b);
  }

  return {
    id: videoID,
    title: videoData ? videoData.title : '',
    description: videoData ? videoData.description : '',
    mp4Link: videoData ? videoData.mp4Link : '',
    thumbnailFull: videoData ? videoData.thumbnailFull : '',
    captions: videoData ? videoData.captions : [],
    parentCategory: videoData ? videoData.parentCategory : '',
    parentCategoryTitle: videoData ? videoData.parentCategoryTitle : '',
    indexInCategory: videoData ? videoData.indexInCategory : 0,
    allVideosInCategory: videoData ? sortedAllVideosInCategory : [],
    isPlaying: playerState.isPlaying,
    volume: playerState.volume,
    currentTime: playerState.currentTime,
    duration: videoData ? videoData.duration : 0,
    showControls: interfaceState.showControls,
    showVolumeControl: interfaceState.showVolumeControl,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getMP4Data: id => dispatch(videoAPIActions.fetchMP4Data(id)),
    getCaptionData: id => dispatch(videoAPIActions.fetchCaptionData(id)),
    setCurrentVideoID: id => dispatch(videoPlayerActions.setVideoID(id)),
    playPauseVideo: play => dispatch(videoPlayerActions.playPauseVideo(play)),
    updateProgress: time => dispatch(videoPlayerActions.updateProgress(time)),
    handleVolumeChange: volume => dispatch(videoPlayerActions.setVolume(volume)),
    toggleVolumeControl: () => dispatch(videoPlayerActions.toggleVolumeControl()),
    toggleControls: show => dispatch(videoPlayerActions.toggleControls(show)),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoScreen);
