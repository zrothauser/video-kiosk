// Dependencies
import React from 'react';
import { connect } from 'react-redux';
import PropTypes from 'prop-types';

// We just need to include this - it's a vanilla JS library
// used in the component
import dragscroll from 'dragscroll'; // eslint-disable-line no-unused-vars

// Components
import VideoGrid from '../../components/VideoGrid';
import TopicsList from '../../components/TopicsList';

// Styles
import './index.css';

class CategoryScreen extends React.Component {
  componentDidUpdate() {
    // Need to reset dragscroll, in case we need it on this screen
    dragscroll.reset();
  }

  render() {
    const {
      selectedCategorySlug,
      videos,
      allCategories,
    } = this.props;

    return (
      <div className="b-category-screen">
        <div className="b-category-screen__main dragscroll">
          <VideoGrid videos={videos} />
        </div>
        <div className="b-category-screen__sidebar">
          <TopicsList
            categories={allCategories}
            selectedCategorySlug={selectedCategorySlug}
          />
        </div>
      </div>
    );
  }
}

CategoryScreen.defaultProps = {
  selectedCategorySlug: '',
  videos: [],
  allCategories: [],
};

CategoryScreen.propTypes = {
  selectedCategorySlug: PropTypes.string,
  videos: PropTypes.arrayOf(PropTypes.object),
  allCategories: PropTypes.arrayOf(PropTypes.object),
};

// Connect with store
const mapStateToProps = (state, ownProps) => {
  const { categories } = state.categories;
  const pageSlug = ownProps.match.params.slug;
  const allVideos = state.videos.videos;
  const categoryData = categories.find(category => category.slug === pageSlug);
  const allCategories = categories.filter(category => category.visibility === 'visible');

  if (!categoryData) {
    return ownProps;
  }

  return {
    selectedCategorySlug: pageSlug,
    videos: allVideos.filter(video => video.parentCategory === categoryData.slug),
    allCategories,
  };
};

export default connect(mapStateToProps)(CategoryScreen);
