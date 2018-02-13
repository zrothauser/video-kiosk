// Dependencies
import React from 'react';
import { Link } from 'react-router-dom';
import PropTypes from 'prop-types';
import { AllHtmlEntities as Entities } from 'html-entities';
import createDOMPurify from 'dompurify';

// Helpers
import { convertSecondsToMinutesSeconds } from '../../utils/video';

// Styles
import './index.css';

// Set up helper objects
const entities = new Entities();
const DOMPurify = createDOMPurify(window);

const VideoThumbnail = (props) => {
  const {
    id,
    title,
    description,
    thumbnail,
    duration,
  } = props;

  return (
    <div className="b-video-thumbnail">

      <Link to={`/video/${id}`}>
          <div className="b-video-thumbnail__wrap">
        	{thumbnail &&
				<img
		            src={thumbnail}
		            className="b-video-thumbnail__image"
		            alt={title}
		          />
        	}
		</div>

        <h3 className="b-video-thumbnail__title">
          {entities.decode(title)}
        </h3>

        <div className="b-video-thumbnail__description">
          {description &&
            <span
              // eslint-disable-next-line react/no-danger
              dangerouslySetInnerHTML={
                { __html: DOMPurify.sanitize(description) }
              }
            />
          }
          {duration &&
            <span className="b-video-thumbnail__time">
              &nbsp;{convertSecondsToMinutesSeconds(duration)}
            </span>
          }
        </div>
      </Link>
    </div>
  );
};

VideoThumbnail.defaultProps = {
  title: '',
  description: '',
  thumbnail: null,
  duration: null,
};

VideoThumbnail.propTypes = {
  id: PropTypes.number.isRequired,
  title: PropTypes.string,
  description: PropTypes.string,
  thumbnail: PropTypes.string,
  duration: PropTypes.number,
};

export default VideoThumbnail;
