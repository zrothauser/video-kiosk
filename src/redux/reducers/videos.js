// Dependencies
import slugify from 'slugify';

// Action types
import * as types from '../actions/actionTypes';

// Helpers
import { extractVimeoIDFromURL } from '../../utils/video';

// Helper function to sort videos by title or category
const sortVideos = (videos, sortKey = 'title') => {
  let key = sortKey;

  // Change "topic" to "parentCategory" for the actual data
  if (sortKey === 'topic') {
    key = 'parentCategory';
  }

  return [...videos].sort((a, b) => {
    if (a[key] < b[key]) {
      return -1;
    } else if (a[key] > b[key]) {
      return 1;
    }

    return 0;
  });
};

// Initial state
const initialState = {
  videos: [],
  isLoading: false,
  isErrored: false,
  error: null,
  sortKey: 'title',
};

// Lets us keep the struct of an individual video consistent
const VIDEO_OBJECT_STRUCTURE = {
  id: 0,
  parentCategory: null,
  parentCategoryTitle: null,
  indexInCategory: null,
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
    type: 'captions',
    language: 'en-US',
    link: null,
    link_expires_time: null,
    hls_link: null,
    hls_link_expires_time: null,
    name: null,
  }],
};

// And the actual reducer
export default (state = initialState, action) => {
  // These get used in many of the action types, if we're getting
  // data for an individual video
  let videoBeingFetched = {};
  let videosWithoutUpdatedVideo = [];

  if (action.id) {
    videoBeingFetched = state.videos.find(video => video.id === action.id);
    videosWithoutUpdatedVideo = [...state.videos.filter(video => video.id !== action.id)];
  }

  switch (action.type) {
    case types.FETCH_APP_DATA:
      return {
        ...state,
        isLoading: true,
      };

    case types.FETCH_APP_DATA_ERROR:
      return {
        ...state,
        isLoading: false,
        isErrored: true,
        error: action.error,
      };

    case types.FETCH_APP_DATA_RECEIVED: {
      // Flatten the data, the API has some redundancy and things
      // are nested too deeply
      const rawData = action.data[0].set;
      const processedData = [...state.videos];

      // Go through each category's videos, add them to our collection
      // if they don't already exist, or update any missing data if they
      // do exist
      const maybeAddVideo = (video) => {
        const videoID = extractVimeoIDFromURL(video.vimeoid);

        // Return if something was wrong with the URL or ID
        if (!videoID) {
          return;
        }

        const existingVideoIndex = processedData.findIndex(oldVideo => oldVideo.id === videoID);

        if (existingVideoIndex !== -1) {
          processedData[existingVideoIndex] = {
            ...processedData[existingVideoIndex],
            id: videoID,
            title: video.title,
            vimeoURL: video.vimeoid,
            parentCategory: video.parentCategory,
            parentCategoryTitle: video.parentCategoryTitle,
            indexInCategory: video.indexInCategory,
          };
        } else {
          processedData.push({
            ...VIDEO_OBJECT_STRUCTURE,
            id: videoID,
            title: video.title,
            vimeoURL: video.vimeoid,
            parentCategory: video.parentCategory,
            parentCategoryTitle: video.parentCategoryTitle,
            indexInCategory: video.indexInCategory,
          });
        }
      };

      rawData.categories.forEach((category) => {
        // Keep track of each video's category slug
        const categorySlug = slugify(category.category.title, { lower: true });
        const categoryTitle = category.category.title;

        category.category.videos.forEach((video, index) => {
          const videoData = video.video;

          // Add additional data that's not in the actual video object from the API
          videoData.parentCategory = categorySlug;
          videoData.parentCategoryTitle = categoryTitle;
          videoData.indexInCategory = index;

          // Add the video to our collection, if needed
          maybeAddVideo(videoData);
        });
      });

      // And also the main background video
      const backgroundVideo = rawData.backgroundvideo;
      maybeAddVideo({
        vimeoURL: backgroundVideo,
      });

      return {
        ...state,
        videos: sortVideos(processedData, state.sortKey),
        isLoading: false,
        isErrored: false,
        error: null,
      };
    }

    case types.FETCH_VIMEO_DATA: {
      const updatedVideos = [
        ...videosWithoutUpdatedVideo,
        {
          ...VIDEO_OBJECT_STRUCTURE,
          ...videoBeingFetched,
          id: action.id,
          isLoading: true,
          isErrored: false,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          error: action.error,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          description: action.data[0].description,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          error: null,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          error: action.error,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          hasCaptions: Object.prototype.hasOwnProperty.call(action.data, 'captions'),
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          captionError: null,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          captionError: action.error,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
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
          captions: action.data,
        },
      ];

      return {
        ...state,
        videos: sortVideos(updatedVideos, state.sortKey),
      };
    }

    case types.INTERFACE_VIDEO_INDEX_SORT: {
      // Videos can be sorted by either category or title
      const sortKey = (action.sortKey === 'topic') ? 'parentCategory' : 'title';

      return {
        ...state,
        sortKey: action.sortKey,
        videos: sortVideos(state.videos, sortKey),
      };
    }

    default:
      return state;
  }
};
