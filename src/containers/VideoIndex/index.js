// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoListModal from '../../components/VideoListModal';

export const VideoIndex = props => (
  <div>
    <span>Video Index Screen</span>
    <VideoListModal videos={props.videos} />
  </div>
);

VideoIndex.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

const mapStateToProps = (state) => {
  const { videos } = state;

  return {
    videos: videos.videos,
  };
};

export default connect(mapStateToProps)(VideoIndex);
