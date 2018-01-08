// Dependencies
import React from 'react'
import { connect } from 'react-redux'
import PropTypes from 'prop-types';

const VideoScreen = (props) => {
  const {
    title
  } = props

  return (
    <div>
      <span>Video: {title}</span>
    </div>
  )
}

VideoScreen.defaultProps = {
  title: '',
  id: 0,
  description: '',
  vimeoURL: ''
}

VideoScreen.propTypes = {
  title: PropTypes.string.isRequired,
  id: PropTypes.number.isRequired,
  description: PropTypes.string,
  vimeoURL: PropTypes.string,
}

// Connect with store
const mapStateToProps = (state, ownProps) => {
  const videoID = ownProps.match.params.id
  const videoData = state.videos.videos.find(video => video.id === videoID)

  if (!videoData) {
    return ownProps
  }

  return {
    title: videoData.title,
    id: videoID,
    description: videoData.description,
    vimeoURL: videoData.vimeoURL
  }
}

export default connect(
  mapStateToProps
)(VideoScreen)