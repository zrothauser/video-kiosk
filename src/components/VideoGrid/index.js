// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';

const VideoGrid = props => (
  <div>
    {props.videos.map(video => (
      <div key={video.id} style={{ borderBottom: '1px solid black', marginBottom: '1em' }}>
        <Link to={`/video/${video.id}`}>
          {video.title}
        </Link>
        <br />
        {video.id}<br />
        {video.description}<br />
        {video.vimeoURL}<br />
        {video.thumbnailLarge}<br />
      </div>
    ))}
  </div>
);

VideoGrid.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoGrid;
