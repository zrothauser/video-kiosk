// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Components
import VideoThumbnail from '../VideoThumbnail';

const VideoGrid = props => (
  <div className="b-video-grid">
    {props.videos.map(video => (
      <VideoThumbnail
        id={video.id}
        title={video.title}
        description={video.description}
        thumbnail={video.thumbnailLarge}
        duration={video.duration}
        key={video.id}
      />
    ))}
  </div>
);

VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoGrid;
