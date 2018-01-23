// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoListModal from '../../components/VideoListModal';

// Actions
import { sortVideoIndexList } from '../../redux/actions/app';

export const VideoIndex = props => (
  <VideoListModal
    videos={props.videos}
    sortVideoIndexList={props.sortVideoIndexList}
    sortingBy={props.sortingBy}
  />
);

VideoIndex.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortVideoIndexList: PropTypes.func.isRequired,
  sortingBy: PropTypes.string.isRequired,
};

const mapStateToProps = (state) => {
  const { videos } = state;
  const { app } = state;

  return {
    videos: videos.videos,
    sortingBy: app.interface.videoIndexSorting,
  };
};

function mapDispatchToProps(dispatch) {
  return bindActionCreators({ sortVideoIndexList }, dispatch);
}

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
