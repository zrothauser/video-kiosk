// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoListModal from '../../components/VideoListModal';

// Actions
import { toggleVideoIndex } from '../../redux/actions/app';

export const VideoIndex = props => (
  <VideoListModal
    videos={props.videos}
    toggleVideoIndex={props.toggleVideoIndex}
    visible={props.visible}
  />
);

VideoIndex.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const { videos } = state;

  return {
    videos: videos.videos,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ toggleVideoIndex }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
