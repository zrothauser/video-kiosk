// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import VideoThumbnail from '../VideoThumbnail';

// Styles
import './index.css';

const VideoGrid = props => (
  <div className="b-video-grid">
    {props.videos.map(video => (
      <VideoThumbnail
        id={video.id}
        title={video.title.rendered}
        categorySlug={props.categorySlug}
        description={video.description}
        thumbnail={video.thumbnail_url}
        duration={video.duration}
        key={video.id}
      />
    ))}
  </div>
);

VideoGrid.propTypes = {
  categorySlug: PropTypes.string.isRequired,
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoGrid;
