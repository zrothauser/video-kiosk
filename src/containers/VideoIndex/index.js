// Dependencies
import React from 'react';
import { bindActionCreators } from 'redux';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoListModal from '../../components/VideoListModal';

// Actions
import * as appActions from '../../redux/actions/app';

export const VideoIndex = ({
  videos,
  toggleVideoIndex,
  visible,
}) => (
  <VideoListModal
    videos={videos}
    toggleVideoIndex={toggleVideoIndex}
    visible={visible}
  />
);

VideoIndex.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

const mapStateToProps = (state) => {
  const {
    videos,
    categories,
  } = state;

  const allVideos = [];

  categories.categories.forEach((category) => {
    category.videos.forEach((videoID) => {
      const videoData = videos.videos.find(video => video.id === parseInt(videoID, 10));

      allVideos.push({
        id: videoData.id,
        title: videoData.title.rendered,
        parentCategorySlug: category.slug,
        parentCategoryTitle: category.title,
        duration: videoData.duration,
      });
    });
  });

  return {
    videos: allVideos,
  };
};

const mapDispatchToProps = (dispatch) => {
  const { toggleVideoIndex } = appActions;

  return bindActionCreators({ toggleVideoIndex }, dispatch);
};

export default connect(mapStateToProps, mapDispatchToProps)(VideoIndex);
