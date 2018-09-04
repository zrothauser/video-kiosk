// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AllHtmlEntities as Entities } from 'html-entities';
import Transition from 'react-transition-group/Transition';

// Helpers
import {
  getCategoryURL,
  getVideoURL,
} from '../../utils/navigation';

import { convertSecondsToMinutesSeconds } from '../../utils/video';

// Components
import Slider from '../Slider';

// Icons
import CCSVG from '../../resources/icons/cc.svg';
import VolumeSVG from '../../resources/icons/volume.svg';
import PreviousSVG from '../../resources/icons/notch-left.svg';
import NextSVG from '../../resources/icons/notch-right.svg';
import UpSVG from '../../resources/icons/notch-up.svg';

// Styles
import './index.css';

// Transitions
import * as transitions from '../transitions';

const {
  durations,
  shortFadeStyles,
  mediumFadeStyles,
} = transitions;

// Set up helper object
const entities = new Entities();

class VideoControls extends React.Component {
  /**
   * Renders the pagination controls part of the Controls.
   *
   * Includes previous/next buttons (if applicable), and the index
   * of the current video out of the total number of videos in the
   * category.
   */
  renderPaginationControls() {
    const {
      allVideosInCategory: allVideos,
      indexInCategory: index,
      parentCategory,
    } = this.props;

    // Don't render anything if there aren't any other videos
    if (allVideos.length === 0) {
      return null;
    }

    // Find the previous and next videos, if they exist
    const previousVideo = (index !== 0) ? allVideos[index - 1] : null;
    const nextVideo = (index + 1 < allVideos.length) ? allVideos[index + 1] : null;

    return (
      <span className="b-video-controls__pagination">
        {previousVideo &&
          <Link
            className="b-video-controls__pagination__button"
            to={getVideoURL(parentCategory, previousVideo)}
            rel="prev"
          >
            <img
              src={PreviousSVG}
              alt="Previous Video"
            />
          </Link>
        }

        <span className="b-video-controls__pagination__numbers">
          <span className="b-video-controls__pagination__current-index">
            {index + 1}
          </span>
          /
          <span className="b-video-controls__pagination__total">
            {allVideos.length}
          </span>
        </span>

        {nextVideo &&
          <Link
            className="b-video-controls__pagination__button"
            to={getVideoURL(parentCategory, nextVideo)}
            rel="next"
          >
            <img
              src={NextSVG}
              alt="Next Video"
            />
          </Link>
        }
      </span>
    );
  }

  render() {
    const {
      title,
      parentCategory,
      parentCategoryTitle,
      duration,
      currentTime,
      hasCaptions,
      volume,
      showVolumeControl,
      handleSeek,
      handleVolumeChange,
      toggleVolumeControl,
      toggleCaptions,
      visible,
    } = this.props;

    return (
      <Transition
        in={visible}
        timeout={durations.medium}
        appear
      >
        {state => (
          <div
            className="b-video-controls"
            style={{
              ...mediumFadeStyles.default,
              ...mediumFadeStyles[state],
            }}
          >
            <div className="b-video-controls__upper">
              <div className="b-video-controls__time">
                {convertSecondsToMinutesSeconds(currentTime)}
              </div>

              <Slider
                minimum={0}
                maximum={duration}
                value={currentTime}
                handleSeek={handleSeek}
              />
            </div>

            <div className="b-video-controls__lower">
              {this.renderPaginationControls()}

              <span className="b-video-controls__title">
                <span className="b-video-controls__title__category">
                  {parentCategoryTitle}:
                </span>
                {entities.decode(title)}
              </span>

              <span className="b-video-controls__lower__right">
                <Link
                  className="b-video-controls__topic-link"
                  to={getCategoryURL(parentCategory)}
                >
                  <img
                    src={UpSVG}
                    alt="Closed Captions Button"
                    className="b-video-controls__topic-icon"
                  />
                  BACK TO TOPIC
                </Link>

                <span className="b-video-controls__lower__right__buttons">
                  <Transition
                    in={showVolumeControl}
                    timeout={durations.shortest}
                  >
                    {controlState => (
                      <div
                        className="b-video-controls__volume-slider"
                        style={{
                          ...shortFadeStyles.default,
                          ...shortFadeStyles[controlState],
                        }}
                      >
                        <Slider
                          minimum={0}
                          maximum={100}
                          value={volume}
                          handleSeek={handleVolumeChange}
                        />
                      </div>
                    )}
                  </Transition>

                  <button
                    className="b-video-controls__volume-button"
                    onClick={() => toggleVolumeControl()}
                  >
                    <img
                      src={VolumeSVG}
                      alt="Volume Controls"
                      className="b-video-controls__volume-icon"
                    />
                  </button>

                  {hasCaptions &&
                    <button
                      className="b-video-controls__cc-button"
                      onClick={() => toggleCaptions()}
                    >
                      <img
                        src={CCSVG}
                        alt="Closed Captions Button"
                        className="b-video-controls__cc-icon"
                      />
                    </button>
                  }
                </span>
              </span>
            </div>

            <span className="b-video-controls__scrim" />
          </div>
        )}
      </Transition>
    );
  }
}

VideoControls.propTypes = {
  title: PropTypes.string.isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  duration: PropTypes.number.isRequired,
  currentTime: PropTypes.number.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.string).isRequired,
  indexInCategory: PropTypes.number.isRequired,
  hasCaptions: PropTypes.bool.isRequired,
  volume: PropTypes.number.isRequired,
  showVolumeControl: PropTypes.bool.isRequired,
  handleSeek: PropTypes.func.isRequired,
  handleVolumeChange: PropTypes.func.isRequired,
  toggleVolumeControl: PropTypes.func.isRequired,
  toggleCaptions: PropTypes.func.isRequired,
  visible: PropTypes.bool.isRequired,
};

export default VideoControls;
