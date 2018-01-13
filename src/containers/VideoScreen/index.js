// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Action types
import { fetchMP4Data, fetchCaptionData } from '../../redux/actions/video';

export class VideoScreen extends React.Component {
  componentDidMount() {
    const { getMP4Data, getCaptionData } = this.props;
    const id = parseInt(this.props.match.params.id, 10);

    // Load additional data
    getMP4Data(id);
    getCaptionData(id);
  }

  render() {
    const {
      title,
      id,
      description,
      mp4Link,
      thumbnailFull,
      captions,
    } = this.props;

    return (
      <div>
        <h1>Video: {title}</h1>
        {id}<br />
        {description}<br />
        {mp4Link}<br />
        {thumbnailFull}
        {captions.length && captions[0].uri}
      </div>
    );
  }
}

VideoScreen.defaultProps = {
  title: '',
  id: null,
  description: '',
  mp4Link: null,
  thumbnailFull: null,
  captions: [{
    uri: null,
  }],
};

VideoScreen.propTypes = {
  title: PropTypes.string,
  id: PropTypes.number,
  description: PropTypes.string,
  mp4Link: PropTypes.string,
  thumbnailFull: PropTypes.string,
  captions: PropTypes.arrayOf(PropTypes.object),
  match: PropTypes.shape({
    params: PropTypes.shape({
      id: PropTypes.string.isRequired,
    }).isRequired,
  }).isRequired,
  getMP4Data: PropTypes.func.isRequired,
  getCaptionData: PropTypes.func.isRequired,
};

// Connect with store
function mapDispatchToProps(dispatch) {
  return {
    getMP4Data: id => dispatch(fetchMP4Data(id)),
    getCaptionData: id => dispatch(fetchCaptionData(id)),
  };
}

const mapStateToProps = (state, ownProps) => {
  const videoID = parseInt(ownProps.match.params.id, 10);
  const videoData = state.videos.videos.find(video => video.id === videoID);

  if (!videoData) {
    return ownProps;
  }

  return {
    title: videoData.title,
    id: videoID,
    description: videoData.description,
    mp4Link: videoData.mp4Link,
    thumbnailFull: videoData.thumbnailFull,
    captions: videoData.captions,
  };
};

export default connect(
  mapStateToProps,
  mapDispatchToProps,
)(VideoScreen);
