// Dependencies
import React from 'react';
import PropTypes from 'prop-types';

// Styles
import './index.css';

class VideoListModal extends React.Component {
  static renderRow(video) {
    return (
      <tr className="b-video-index__row">
        <td className="b-video-index__cell">
          {video.title}
        </td>
        <td className="b-video-index__cell">
          {video.topic}
        </td>
        <td className="b-video-index__cell">
          {video.time}
        </td>
      </tr>
    );
  }

  render() {
    const { videos } = this.props;

    return (
      <div className="b-video-index">
        <div className="b-video-index__container">
          <table className="b-video-index__table">
            <thead className="b-video-index__head">
              <tr>
                <td className="b-video-index__cell">
                  TITLE
                </td>
                <td className="b-video-index__cell">
                  TOPIC
                </td>
                <td className="b-video-index__cell">
                  TIME
                </td>
              </tr>
            </thead>
            <tbody className="b-video-index__body">
              {videos.forEach(video => VideoListModal.renderRow(video))}
            </tbody>
          </table>
        </div>
      </div>
    );
  }
}

VideoListModal.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
};

export default VideoListModal;
