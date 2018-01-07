import request from 'superagent'

import * as types from '../redux/actions/appData'

// API base URL
const API_URL = 'https://csm-proxy-v2.herokuapp.com/'

const apiData = store => next => action => {
    /*
    Pass all actions through by default
    */
    next(action)

    switch (action.type) {
        case types.FETCH_APP_DATA:
            // In case we receive an action to send an API
            // request, send the appropriate request
            request
                .get(API_URL)
                .end((error, res) => {
                    if (error) {
                        // In case there is any error, dispatch an
                        // action containing the error
                        return next({
                            type: types.FETCH_APP_DATA_ERROR,
                            error
                        })
                    }
                    const data = JSON.parse(res.text)
                    // Once data is received, dispatch an action telling the application
                    // that data was received successfully, along with the parsed data
                    next({
                        type: types.FETCH_APP_DATA_RECEIVED,
                        data
                    })
                })
            break
        default:
            break
    }
};

export default apiData
