export const videoActionTypes = {
    // Vimeo API actions
    FETCH_VIMEO_DATA: 'api/vimeo/fetchData',
    FETCH_VIMEO_DATA_ERROR: 'api/vimeo/errorReceived',
    FETCH_VIMEO_DATA_RECEIVED: 'api/vimeo/dataReceived',

    // MP4 API actions
    FETCH_MP4_DATA: 'api/mp4/fetchData',
    FETCH_MP4_DATA_ERROR: 'api/mp4/errorReceived',
    FETCH_MP4_DATA_RECEIVED: 'api/mp4/dataReceived',

    // Caption API actions
    FETCH_CAPTION_DATA: 'api/caption/fetchData',
    FETCH_CAPTION_DATA_ERROR: 'api/caption/errorReceived',
    FETCH_CAPTION_DATA_RECEIVED: 'api/caption/dataReceived'
}

export function fetchVimeoData(id) {
    return {
        type: videoActionTypes.FETCH_VIMEO_DATA,
        id
    }
}

export function fetchMP4Data(id) {
    return {
        type: videoActionTypes.FETCH_MP4_DATA,
        id
    }
}

export function fetchCaptionData(id) {
    return {
        type: videoActionTypes.FETCH_CAPTION_DATA,
        id
    }
}