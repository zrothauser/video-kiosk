// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoListModal from '../../components/VideoListModal';

// Actions
import { sortVideoIndexList, toggleVideoIndex } from '../../redux/actions/app';

export const VideoIndex = props => (
  <VideoListModal
    videos={props.videos}
    sortingBy={props.sortingBy}
    sortVideoIndexList={props.sortVideoIndexList}
    toggleVideoIndex={props.toggleVideoIndex}
  />
);

VideoIndex.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortingBy: PropTypes.string.isRequired,
  sortVideoIndexList: PropTypes.func.isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
};

const mapStateToProps = (state) => {
  const { videos } = state;
  const { app } = state;

  return {
    videos: videos.videos,
    sortingBy: app.interface.videoIndexSorting,
  };
};

const mapDispatchToProps = dispatch => (
  bindActionCreators({ sortVideoIndexList, toggleVideoIndex }, dispatch));

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
