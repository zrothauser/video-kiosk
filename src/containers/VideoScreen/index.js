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
      indexInCategory,
      otherVideos,
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
          indexInCategory={indexInCategory}
          otherVideos={otherVideos}
        />
      </div>
    );
  }
}

VideoScreen.defaultProps = {
  title: '',
  id: null,
  mp4Link: null,
  thumbnailFull: null,
  // captions: [{
  //   uri: null,
  // }],
  parentCategory: '',
  indexInCategory: 0,
  otherVideos: [],
};

VideoScreen.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  mp4Link: PropTypes.string,
  thumbnailFull: PropTypes.string,
  // captions: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getMP4Data: PropTypes.func.isRequired,
  getCaptionData: PropTypes.func.isRequired,
  setCurrentVideoID: PropTypes.func.isRequired,
  playPauseVideo: PropTypes.func.isRequired,
  parentCategory: PropTypes.string,
  indexInCategory: PropTypes.number,
  otherVideos: PropTypes.arrayOf(PropTypes.object),
};

// Connect with store
function mapDispatchToProps(dispatch) {
  return {
    getMP4Data: id => dispatch(videoAPIActions.fetchMP4Data(id)),
    getCaptionData: id => dispatch(videoAPIActions.fetchCaptionData(id)),
    setCurrentVideoID: id => dispatch(videoPlayerActions.setVideoID(id)),
    playPauseVideo: () => dispatch(videoPlayerActions.playPauseVideo()),
  };
}

const mapStateToProps = (state, ownProps) => {
  // Get data for this video, if it exists
  const allVideos = state.videos.videos;
  const videoID = parseInt(ownProps.match.params.id, 10);
  const videoData = allVideos.find(video => video.id === videoID);

  if (!videoData) {
    return ownProps;
  }

  // Get the other videos in the category
  const otherVideos = allVideos.filter(video => video.parentCategory === videoData.parentCategory);
  const sortedOtherVideos = otherVideos.sort((a, b) => a - b);

  return {
    title: videoData.title,
    id: videoID,
    description: videoData.description,
    mp4Link: videoData.mp4Link,
    thumbnailFull: videoData.thumbnailFull,
    captions: videoData.captions,
    duration: videoData.duration,
    parentCategory: videoData.parentCategory,
    indexInCategory: videoData.indexInCategory,
    otherVideos: sortedOtherVideos,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoScreen);
