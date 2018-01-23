// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AllHtmlEntities as Entities } from 'html-entities';
import ScrollLock from 'react-scrolllock';

// Helpers
import { convertSecondsToMinutesSeconds } from '../../utils/video';

// Icons
import DownIcon from '../../resources/icons/notch-down.svg';

// Styles
import './index.css';

// Set up helper object
const entities = new Entities();

class VideoListModal extends React.Component {
  renderRow(video) {
    return (
      <tr className="b-video-index__row" key={video.id}>
        <td className="b-video-index__cell">
          <Link
            to={`/video/${video.id}`}
            onClick={() => this.props.toggleVideoIndex()}
          >
            {entities.decode(video.title)}
          </Link>
        </td>
        <td className="b-video-index__cell">
          {video.parentCategoryTitle}
        </td>
        <td className="b-video-index__cell">
          {convertSecondsToMinutesSeconds(video.duration)}
        </td>
      </tr>
    );
  }

  render() {
    const {
      videos,
      sortingBy,
      sortVideoIndexList,
    } = this.props;

    return (
      <div className="b-video-index">
        <div className="b-video-index__container">
          <table className="b-video-index__table">
            <thead className="b-video-index__head">
              <tr>
                <td className="b-video-index__cell">
                  <span
                    onClick={() => sortVideoIndexList('title')}
                    onKeyPress={() => sortVideoIndexList('title')}
                    role="button"
                    tabIndex="0"
                    className="b-video-index__sorter"
                  >
                    TITLE
                    {(sortingBy === 'title') &&
                      <img
                        src={DownIcon}
                        alt="Sorting by Title"
                        className="b-video-index__sort-icon"
                      />}
                  </span>
                </td>
                <td className="b-video-index__cell">
                  <span
                    onClick={() => sortVideoIndexList('topic')}
                    onKeyPress={() => sortVideoIndexList('topic')}
                    role="button"
                    tabIndex="0"
                    className="b-video-index__sorter"
                  >
                    TOPIC
                    {(sortingBy === 'topic') &&
                      <img
                        src={DownIcon}
                        alt="Sorting by Topic"
                        className="b-video-index__sort-icon"
                      />}
                  </span>
                </td>
                <td className="b-video-index__cell">
                  TIME
                </td>
              </tr>
            </thead>
            <tbody className="b-video-index__body">
              {videos.map(video => this.renderRow(video))}
            </tbody>
          </table>
        </div>
        <ScrollLock />
      </div>
    );
  }
}

VideoListModal.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  sortingBy: PropTypes.string.isRequired,
  sortVideoIndexList: PropTypes.func.isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
};

export default VideoListModal;
