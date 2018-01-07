// Action types
import * as types from '../actions/appData'

// Utilities
import extractVimeoIDFromURL from '../../utils/video'

const initialState = {
    videos: [],
    isLoading: false,
    isErrored: false,
    error: null
}

export default (state = initialState, action) => {
    switch (action.type) {
        case types.FETCH_APP_DATA:
            return {
                ...state,
                isLoading: true
            }

        case types.FETCH_APP_DATA_ERROR:
            return {
                ...state,
                isLoading: false,
                isErrored: true,
                error: action.error
            }

        case types.FETCH_APP_DATA_RECEIVED:
            // Flatten the data, the API has some redundancy and things
            // are nested too deeply
            const rawData = action.data[0].set
            const processedData = []

            // Go through each category's videos, add them to our collection
            // if they don't already exist
            const maybeAddVideo = video => {
                const videoID = extractVimeoIDFromURL(video.vimeoid);
                const doesVideoExistAlready = processedData.find(existingVideo => existingVideo.id === videoID)

                if (videoID && !doesVideoExistAlready) {
                    processedData.push({
                        id: videoID,
                        title: video.title,
                        description: video.description,
                        vimeoURL: video.vimeoid
                    });
                }
            }

            rawData.categories.forEach(category => {
                category.category.videos.forEach(video => {
                    const videoData = video.video
                    maybeAddVideo(videoData)
                })
            })

            // And also the main background video
            const backgroundVideo = rawData.backgroundvideo;
            maybeAddVideo({
                title: null,
                description: null,
                vimeoURL: backgroundVideo
            })

            return {
                ...state,
                videos: processedData,
                isLoading: false,
                isErrored: false,
                error: null
            }

        default:
            return state
    }
}
