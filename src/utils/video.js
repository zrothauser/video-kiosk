/**
 * Extracts the video ID from a Vimeo URL.
 *
 * For example, if passed https://vimeo.com/161505682, this
 * would return an integer 161505682.
 *
 * @param  string vimeoURL The URL to the video.
 * @return int             The video's ID, or null if misshapped URL.
 */
const extractVimeoIDFromURL = (vimeoURL) => {

    if (!vimeoURL) {
        return null
    }

    const urlParts = vimeoURL.split('/')
    const videoID = urlParts[urlParts.length - 1]

    if (!videoID) {
        return null
    }

    return parseInt(videoID, 10)
}

export default extractVimeoIDFromURL