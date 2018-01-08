// App API action types
export const appAPIActionTypes = {
    FETCH_APP_DATA: 'api/app/fetchData',
    FETCH_APP_DATA_ERROR: 'api/app/errorReceived',
    FETCH_APP_DATA_RECEIVED: 'api/app/dataReceived'
}

// Actions
export function fetchAppData() {
    return {
        type: appAPIActionTypes.FETCH_APP_DATA
    }
}