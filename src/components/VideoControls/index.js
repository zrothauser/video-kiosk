// Dependencies
import React from 'react';
import PropTypes from 'prop-types';
import { Link } from 'react-router-dom';
import { AllHtmlEntities as Entities } from 'html-entities';

// Icons
import CCSVG from '../../resources/icons/cc.svg';
import VolumeSVG from '../../resources/icons/volume.svg';
import PreviousSVG from '../../resources/icons/notch-left.svg';
import NextSVG from '../../resources/icons/notch-right.svg';
import UpSVG from '../../resources/icons/notch-up.svg';

// Styles
import './index.css';

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
            onClick={() => { console.log('clicked Previous Video button'); }}
            to={`/video/${previousVideo.id}`}
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
            to={`/video/${nextVideo.id}`}
            onClick={() => { console.log('clicked Next Video button'); }}
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
      hasCaptions,
      // volume,
      showVolumeControls,
    } = this.props;

    return (
      <div className="b-video-controls">
        <div className="b-video-controls__upper">
          {/* <Scrubber /> */}
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
              to={`/category/${parentCategory}`}
            >
              <img
                src={UpSVG}
                alt="Closed Captions Button"
                className="b-video-controls__topic-icon"
              />
              BACK TO TOPIC
            </Link>

            <span className="b-video-controls__lower__right__buttons">
              <button
                className="b-video-controls__volume-button"
                onClick={() => console.log('volume control clicked')}
              >
                <img
                  src={VolumeSVG}
                  alt="Volume Controls"
                  className="b-video-controls__volume-icon"
                />
              </button>

              {showVolumeControls &&
                {/** <VolumeSlider /> */}
              }

              {hasCaptions &&
                <button
                  className="b-video-controls__cc-button"
                  onClick={() => console.log('cc control clicked')}
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
      </div>
    );
  }
}

VideoControls.propTypes = {
  title: PropTypes.string.isRequired,
  parentCategory: PropTypes.string.isRequired,
  parentCategoryTitle: PropTypes.string.isRequired,
  allVideosInCategory: PropTypes.arrayOf(PropTypes.object).isRequired,
  indexInCategory: PropTypes.number.isRequired,
  hasCaptions: PropTypes.bool.isRequired,
  // volume: PropTypes.number.isRequired,
  showVolumeControls: PropTypes.bool.isRequired,
};

export default VideoControls;
