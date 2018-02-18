// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AllHtmlEntities as Entities } from 'html-entities';
import ScrollLock from 'react-scrolllock';
import Transition from 'react-transition-group/Transition';

// Helpers
import { convertSecondsToMinutesSeconds } from '../../utils/video';

// Styles
import './index.css';

// Transition
import * as transitions from '../transitions';

const {
  durations,
  mediumFadeStyles,
} = transitions;

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
      visible,
    } = this.props;

    return (
      <Transition
        in={visible}
        timeout={durations.medium}
        appear
        mountOnEnter
        unmountOnExit
      >
        {state => (
          <div
            className="b-video-index"
            style={{
              ...mediumFadeStyles.default,
              ...mediumFadeStyles[state],
            }}
          >
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
                  {videos.map(video => this.renderRow(video))}
                </tbody>
              </table>
            </div>
            <ScrollLock />
          </div>
        )}
      </Transition>
    );
  }
}

VideoListModal.propTypes = {
  videos: PropTypes.arrayOf(PropTypes.object).isRequired,
  toggleVideoIndex: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default VideoListModal;
