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

  // eslint-disable-next-line class-methods-use-this
  handleSeek() {
    // const { duration } = this.props;
    // const clickedTime = (percent / 100) * duration;

    // this.props.actions.seekProgress(clickedTime);

    // eslint-disable-next-line no-console
    console.log('seek');
  }


  render() {
    const {
      title,
      mp4Link,
      thumbnailFull,
      playPauseVideo,
      parentCategory,
      parentCategoryTitle,
      indexInCategory,
      allVideosInCategory,
      isPlaying,
      volume,
      currentTime,
      showControls,
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
          togglePlay={playPauseVideo}
          parentCategory={parentCategory}
          parentCategoryTitle={parentCategoryTitle}
          indexInCategory={indexInCategory}
          allVideosInCategory={allVideosInCategory}
          isPlaying={isPlaying}
          volume={volume}
          currentTime={currentTime}
          showControls={showControls}
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
  // captions: PropTypes.arrayOf(PropTypes.shape({uri: PropTypes.string})).isRequired,
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getMP4Data: PropTypes.func.isRequired,
  getCaptionData: PropTypes.func.isRequired,
  setCurrentVideoID: PropTypes.func.isRequired,
  playPauseVideo: PropTypes.func.isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  indexInCategory: PropTypes.number.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  showControls: PropTypes.bool.isRequired,
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
    duration: videoData ? videoData.duration : 0,
    parentCategory: videoData ? videoData.parentCategory : '',
    parentCategoryTitle: videoData ? videoData.parentCategoryTitle : '',
    indexInCategory: videoData ? videoData.indexInCategory : 0,
    allVideosInCategory: videoData ? sortedAllVideosInCategory : [],
    isPlaying: playerState.isPlaying,
    volume: playerState.volume,
    currentTime: playerState.currentTime,
    showControls: interfaceState.showControls,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    getMP4Data: id => dispatch(videoAPIActions.fetchMP4Data(id)),
    getCaptionData: id => dispatch(videoAPIActions.fetchCaptionData(id)),
    setCurrentVideoID: id => dispatch(videoPlayerActions.setVideoID(id)),
    playPauseVideo: () => dispatch(videoPlayerActions.playPauseVideo()),
  };
}

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoScreen);
