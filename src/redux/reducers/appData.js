import * as types from '../actions/appData'

const initialState = {
    title: null,
    backgroundVideo: null,
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
            const rawAppData = action.data[0].set

            return {
                ...state,
                title: rawAppData.title,
                backgroundVideo: rawAppData.backgroundvideo,
                isLoading: false,
                isErrored: false,
                error: null
            }

        default:
            return state
    }
}
