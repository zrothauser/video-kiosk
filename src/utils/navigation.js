/* eslint import/prefer-default-export: 0 */

import store from '../redux/configureStore';

/**
 * Gets the home link, based on the selected set.
 *
 * @returns string The relative path to the category.
 */
export function getHomeURL() {
  const setName = store.getState().app.selectedSet;
  return `/${setName}/`;
}

/**
 * Builds a category link.
 *
 * @param {string} Video category.
 *
 * @returns string The relative path to the category.
 */
export function getCategoryURL(category) {
  const setName = store.getState().app.selectedSet;
  return `/${setName}/${category}/`;
}

/**
 * Builds a video link based on the category and ID.
 *
 * @param {string} Video category.
 * @param {Number} videoID Video ID.
 *
 * @returns string The relative path to the video.
 */
export function getVideoURL(category, videoID) {
  const setName = store.getState().app.selectedSet;
  return `/${setName}/${category}/${videoID}`;
}
