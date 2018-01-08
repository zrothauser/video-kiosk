// Dependencies
import React from 'react';
import { Link } from 'react-router-dom'
import PropTypes from 'prop-types';

const VideoGrid = (props) => (
    <div>
        {props.videos.map((video, index) => (
            <Link
                to={`/video/${video.id}`}
                key={index}
            >
                <div key={video.id} style={{ borderBottom: "1px solid black", marginBottom: "1em" }}>
                    {video.title}<br />
                    {video.id}<br />
                    {video.description}<br />
                    {video.vimeoURL}<br />
                </div>
            </Link>
        ))}
    </div>
)

VideoGrid.defaultProps = {
    categories: []
}

VideoGrid.propTypes = {
    videos: PropTypes.arrayOf(PropTypes.object).isRequired,
}

export default VideoGrid
