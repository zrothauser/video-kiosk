// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './index.css';

const VideoControls = (props) => {
  const {
    title,
  } = props;

  return (
    <div className="b-video-controls">
      <span>
        {title}
      </span>
    </div>
  );
};

VideoControls.defaultProps = {
  title: '',
};

VideoControls.propTypes = {
  title: PropTypes.string,
};

export default VideoControls;
