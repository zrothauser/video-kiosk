// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';

// Components
import VideoPlayer from '../../components/VideoPlayer';

// Helpers
import { getCategoryURL } from '../../utils/navigation';

// Action types
import * as videoPlayerActions from '../../redux/actions/videoPlayer';

export class VideoScreen extends React.Component {
  /**
   * Load the video data.
   */
  componentDidMount() {
    // Load the video data, if the ID is available yet
    if (this.props.id) {
      this.loadVideoData();
    }
  }

  /**
   * If the video ID changed, load the new data.
   */
  componentDidUpdate(prevProps) {
    // Don't do anything if the ID didn't change
    if (prevProps.id === this.props.id) {
      return;
    }

    this.loadVideoData();
  }

  /**
   * Called either when this screen is mounted
   * or when the current video is changed, to load the
   * API data for the selected video.
   */
  loadVideoData() {
    const {
      id,
      setCurrentVideoID,
    } = this.props;

    // Keep track of the current video
    setCurrentVideoID(id);
  }

  /**
   * Navigates away from the playing video to
   * the video's topic page.
   */
  navigateToTopic() {
    const {
      history,
      parentCategory,
    } = this.props;

    history.push(getCategoryURL(parentCategory));
  }

  render() {
    const {
      title,
      mp4Link,
      captions,
      playPauseVideo,
      parentCategory,
      parentCategoryTitle,
      indexInCategory,
      allVideosInCategory,
      isPlaying,
      volume,
      currentTime,
      duration,
      showCaptions,
      showControls,
      showVolumeControl,
      updateProgress,
      handleVolumeChange,
      toggleVolumeControl,
      toggleControls,
      toggleCaptions,
    } = this.props;

    return (
      <VideoPlayer
        title={title}
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
        showCaptions={showCaptions}
        showControls={showControls}
        showVolumeControl={showVolumeControl}
        updateProgress={updateProgress}
        handleVolumeChange={handleVolumeChange}
        toggleVolumeControl={toggleVolumeControl}
        toggleControls={toggleControls}
        toggleCaptions={toggleCaptions}
      />
    );
  }
}

VideoScreen.propTypes = {
  history: PropTypes.shape({ push: PropTypes.func }).isRequired,
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  mp4Link: PropTypes.string.isRequired,
  captions: PropTypes.shape({ link: PropTypes.string }).isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  indexInCategory: PropTypes.number.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
  isPlaying: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  duration: PropTypes.number.isRequired,
  showCaptions: PropTypes.bool.isRequired,
  showControls: PropTypes.bool.isRequired,
  showVolumeControl: PropTypes.bool.isRequired,
  setCurrentVideoID: PropTypes.func.isRequired,
  playPauseVideo: PropTypes.func.isRequired,
  updateProgress: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  toggleVolumeControl: PropTypes.func.isRequired,
  toggleControls: PropTypes.func.isRequired,
  toggleCaptions: PropTypes.func.isRequired,
};

// Connect with store
const mapStateToProps = (state, ownProps) => {
  // Get data for this video, if it exists
  const allVideos = state.videos.videos;
  const videoID = parseInt(ownProps.match.params.id, 10);
  const videoData = allVideos.find(video => video.id === videoID) || {};

  // Get anything related to the video player's state
  const {
    playerState,
    interface: interfaceState,
  } = state.videoPlayer;

  // Get the other videos in the category
  const allCategories = state.categories.categories;
  const { categorySlug } = ownProps.match.params;
  const categoryData = allCategories.find(category => categorySlug === category.slug) || {};
  const allVideosInCategory = categoryData.videos || [];

  // Find the index of this video
  const indexInCategory = allVideosInCategory.length ?
    allVideosInCategory.findIndex(id => videoID === parseInt(id, 10)) :
    0;

  return {
    id: videoID,
    title: (videoData.title && videoData.title.rendered) ? videoData.title.rendered : '',
    description: videoData.description || '',
    mp4Link: videoData.hd_mp4_url || '',
    parentCategory: categoryData.slug || '',
    parentCategoryTitle: categoryData.title || '',
    indexInCategory,
    allVideosInCategory: allVideosInCategory || [],
    isPlaying: playerState.isPlaying,
    volume: playerState.volume,
    currentTime: playerState.currentTime,
    duration: videoData.duration || 0,
    captions: videoData.captions || {},
    showCaptions: interfaceState.showCaptions,
    showControls: interfaceState.showControls,
    showVolumeControl: interfaceState.showVolumeControl,
  };
};

function mapDispatchToProps(dispatch) {
  return {
    setCurrentVideoID: id => dispatch(videoPlayerActions.setVideoID(id)),
    playPauseVideo: play => dispatch(videoPlayerActions.playPauseVideo(play)),
    updateProgress: time => dispatch(videoPlayerActions.updateProgress(time)),
    handleVolumeChange: volume => dispatch(videoPlayerActions.setVolume(volume)),
    toggleVolumeControl: () => dispatch(videoPlayerActions.toggleVolumeControl()),
    toggleControls: show => dispatch(videoPlayerActions.toggleControls(show)),
    toggleCaptions: () => dispatch(videoPlayerActions.toggleCaptions()),
  };
}

export default withRouter(connect(mapStateToProps, mapDispatchToProps)(VideoScreen));
