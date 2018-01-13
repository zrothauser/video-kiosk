// Dependencies
import request from 'superagent'

// Action types
import * as types from '../redux/actions/actionTypes';

// Other utilities
import { extractVideoIDsFromCompleteData } from './video'

// API base URL
const API_URL          = 'https://csm-proxy-v2.herokuapp.com/'
const MP4_API_BASE_URL = 'https://csm-proxy-v2.herokuapp.com/video/'
const VIMEO_BASE_URL   = 'https://vimeo.com/api/v2/video/'

/**
 * Middleware to retrieve base API data.
 */
export const apiData = store => next => action => {
    // Pass all actions through by default
    next(action)

    switch (action.type) {
        case types.FETCH_APP_DATA:
            request
                .get(API_URL)
                .end((error, res) => {
                    if (error) {
                        return next({
                            type: types.FETCH_APP_DATA_ERROR,
                            error
                        })
                    }
                    const data = JSON.parse(res.text)

                    // Get all video IDs, so we can load vimeo data for each
                    const allVideoIDs = extractVideoIDsFromCompleteData(data)

                    allVideoIDs.forEach(videoID => {
                        store.dispatch({
                            type: types.FETCH_VIMEO_DATA,
                            id: videoID
                        })
                    })

                    // Dispatch a success action
                    next({
                        type: types.FETCH_APP_DATA_RECEIVED,
                        data
                    })
                })
            break
        default:
            break
    }
}

/**
 * Middleware to load additional data for a video from Vimeo.
 */
export const vimeoData = store => next => action => {
    // Pass all actions through by default
    next(action)

    switch (action.type) {
        case types.FETCH_VIMEO_DATA:
            // Build the API url
            const apiURL = VIMEO_BASE_URL + action.id + '.json'

            // In case we receive an action to send an API
            // request, send the appropriate request
            request
                .get(apiURL)
                .end((error, res) => {
                    if (error) {
                        return next({
                            type: types.FETCH_VIMEO_DATA_ERROR,
                            id: action.id,
                            error
                        })
                    }
                    const data = JSON.parse(res.text)
                    next({
                        type: types.FETCH_VIMEO_DATA_RECEIVED,
                        id: action.id,
                        data
                    })
                })
            break
        default:
            break
    }
}

/**
 * Middleware to load the MP4 data from the API.
 */
export const mp4APIData = store => next => action => {
    // Pass all actions through by default
    next(action)

    switch (action.type) {
        case types.FETCH_MP4_DATA:
            const apiURL = MP4_API_BASE_URL + action.id

            request
                .get(apiURL)
                .end((error, res) => {
                    if (error) {
                        return next({
                            type: types.FETCH_MP4_DATA_ERROR,
                            id: action.id,
                            error
                        })
                    }

                    // The data contains more JSON that's unfortunately encoded,
                    // so decode twice
                    const data = JSON.parse(res.text)
                    const actualData = JSON.parse(data.entire_json)

                    next({
                        type: types.FETCH_MP4_DATA_RECEIVED,
                        id: action.id,
                        data: actualData
                    })
                })
            break
        default:
            break
    }
}

/**
 * Middleware to load the caption data from the API.
 */
export const captionAPIData = store => next => action => {
    // Pass all actions through by default
    next(action)

    switch (action.type) {
        case types.FETCH_CAPTION_DATA:
            const apiURL = MP4_API_BASE_URL + action.id + '/captions'

            request
                .get(apiURL)
                .end((error, res) => {
                    if (error) {
                        return next({
                            type: types.FETCH_CAPTION_DATA_ERROR,
                            id: action.id,
                            error
                        })
                    }
                    const data = JSON.parse(res.text)

                    next({
                        type: types.FETCH_CAPTION_DATA_RECEIVED,
                        id: action.id,
                        data: data.data
                    })
                })
            break
        default:
            break
    }
}

export default apiData
