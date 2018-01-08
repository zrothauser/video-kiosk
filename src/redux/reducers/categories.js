// Dependencies
import slugify from 'slugify'

// Action types
import * as types from '../actions/appData'

// Utilities
import extractVimeoIDFromURL from '../../utils/video'

const initialState = {
    categories: [],
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
            const rawCategoryData = action.data[0].set.categories
            const processedData = rawCategoryData.map(category => {
                // Start with all videos in the data
                const categoryVideos = category.category.videos

                // Strip out ones that are missing the vimeo URL... there could be some
                const validCategoryVideos = categoryVideos.filter(video => video.video.vimeoid)

                // Strip down to the video IDs
                const videoIDs = validCategoryVideos.map(video => extractVimeoIDFromURL(video.video.vimeoid))
                const validatedVideoIDs = videoIDs.filter(videoID => typeof videoID === 'number')

                return {
                    slug: slugify(category.category.title, { lower: true }),
                    title: category.category.title,
                    visibility: category.category.visibility,
                    videos: validatedVideoIDs
                }
            });

            return {
                ...state,
                categories: processedData,
                isLoading: false,
                isErrored: false,
                error: null
            }

        default:
            return state
    }
}
