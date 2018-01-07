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
                return {
                    title: category.category.title,
                    visibility: category.category.visibility,
                    videos: category.category.videos.map(video => extractVimeoIDFromURL(video.video.vimeoid))
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
