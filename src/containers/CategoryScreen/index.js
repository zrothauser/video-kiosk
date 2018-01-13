// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// Components
import VideoGrid from '../../components/VideoGrid';

export const CategoryScreen = (props) => {
  const {
    title,
    videos,
  } = props;

  return (
    <div>
      <div>
        <span>Category: {title}</span>
      </div>
      <div>
        <h1>Videos:</h1>
        <VideoGrid videos={videos} />
      </div>
    </div>
  );
};

CategoryScreen.propTypes = {
  title: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

// Connect with store
const mapStateToProps = (state, ownProps) => {
  const pageSlug = ownProps.match.params.slug;
  const videosData = state.videos.videos;
  const categoryData = state.categories.categories.find(category => category.slug === pageSlug);

  if (!categoryData) {
    return ownProps;
  }

  return {
    title: categoryData.title,
    videos: categoryData.videos.map(videoID => videosData.find(video => video.id === videoID)),
  };
};

export default connect(mapStateToProps)(CategoryScreen);
