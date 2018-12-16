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

export class CategoryScreen extends React.Component {
  componentDidMount() {
    // Need to reset dragscroll, it may have run before render()
    // happened
    dragscroll.reset();
  }

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
          <VideoGrid
            categorySlug={selectedCategorySlug}
            videos={videos}
          />
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
  // We need to look everything up by the page slug
  const pageSlug = ownProps.match.params.categorySlug;

  // First we need to get all the categories and all videos
  const { categories } = state.categories;
  const allVideos = state.videos.videos;

  // Then pull out the videos for the selected category
  const categoryData = categories.find(category => category.slug === pageSlug) || {};
  const categoryVideos = categoryData.videos || [];
  const videos = categoryVideos.map(id => allVideos.find(video => parseInt(id, 10) === video.id));

  return {
    selectedCategorySlug: pageSlug,
    videos,
    allCategories: categories,
  };
};

export default connect(mapStateToProps)(CategoryScreen);
