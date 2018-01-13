// Action types
import * as types from '../actions/actionTypes';

// Utilities
import { extractVimeoIDFromURL } from '../../utils/video'

// Initial state
const initialState = {
    videos: [],
    isLoading: false,
    isErrored: false,
    error: null
}

// Lets us keep the struct of an individual video consistent
const VIDEO_OBJECT_STRUCTURE = {
    id: 0,
    title: null,
    description: null,
    vimeoURL: null,
    isLoading: false,
    isErrored: false,
    error: null,
    thumbnailLarge: null,
    duration: 0,
    mp4Link: null,
    thumbnailFull: null,
    hasCaptions: false,
    isCaptionLoading: false,
    isCaptionErrored: false,
    captionError: null,
    captions: [{
        uri: null,
        active: false,
        type: "captions",
        language: "en-US",
        link: null,
        link_expires_time: null,
        hls_link: null,
        hls_link_expires_time: null,
        name: null
    }]
}

// And the actual reducer
export default (state = initialState, action) => {

    // These get used in many of the action types, if we're getting
    // data for an individual video
    let videoBeingFetched = {}
    let videosWithoutUpdatedVideo = []

    if (action.id) {
        videoBeingFetched = state.videos.find(video => video.id === action.id)
        videosWithoutUpdatedVideo = [...state.videos.filter(video => video.id !== action.id)]
    }

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
            const processedData = [...state.videos]

            // Go through each category's videos, add them to our collection
            // if they don't already exist, or update any missing data if they
            // do exist
            const maybeAddVideo = video => {
                const videoID = extractVimeoIDFromURL(video.vimeoid);
                const existingVideoIndex = processedData.findIndex(existingVideo => existingVideo.id === videoID)

                // Return if something was wrong with the URL or ID
                if (!videoID) {
                    return
                }

                if (-1 !== existingVideoIndex) {
                    processedData[existingVideoIndex] = {
                        ...processedData[existingVideoIndex],
                        id: videoID,
                        title: video.title,
                        vimeoURL: video.vimeoid
                    }
                } else {
                    processedData.push({
                        ...VIDEO_OBJECT_STRUCTURE,
                        id: videoID,
                        title: video.title,
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
                vimeoURL: backgroundVideo
            })

            return {
                ...state,
                videos: processedData,
                isLoading: false,
                isErrored: false,
                error: null
            }

        case types.FETCH_VIMEO_DATA: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isLoading: true,
                    isErrored: false
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_VIMEO_DATA_ERROR: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isLoading: false,
                    isErrored: true,
                    error: action.error
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_VIMEO_DATA_RECEIVED: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isLoading: false,
                    isErrored: false,
                    error: null,
                    thumbnailLarge: action.data[0].thumbnail_large,
                    duration: action.data[0].duration,
                    description: action.data[0].description
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_MP4_DATA: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isLoading: true,
                    isErrored: false,
                    error: null
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_MP4_DATA_ERROR: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isLoading: false,
                    isErrored: true,
                    error: action.error
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_MP4_DATA_RECEIVED: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isLoading: false,
                    isErrored: false,
                    error: null,
                    mp4Link: action.data.HD.link,
                    thumbnailFull: action.data.thumb.link,
                    hasCaptions: action.data.hasOwnProperty('captions')
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_CAPTION_DATA: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isCaptionLoading: true,
                    isCaptionErrored: false,
                    captionError: null
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_CAPTION_DATA_ERROR: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isCaptionLoading: false,
                    isCaptionErrored: true,
                    captionError: action.error
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        case types.FETCH_CAPTION_DATA_RECEIVED: {
            const updatedVideos = [
                ...videosWithoutUpdatedVideo,
                {
                    ...VIDEO_OBJECT_STRUCTURE,
                    ...videoBeingFetched,
                    id: action.id,
                    isCaptionLoading: false,
                    isCaptionErrored: false,
                    captionError: null,
                    captions: action.data
                }
            ]

            return {
                ...state,
                videos: updatedVideos
            }
        }

        default:
            return state
    }
}
