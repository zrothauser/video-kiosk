/* eslint import/prefer-default-export: 0 */

/**
 * Formats a time value from seconds (eg. 101.235) to mm:ss (eg. 1:41).
 *
 * @param int Time in seconds
 *
 * @return Formatted time string.
 */
export function convertSecondsToMinutesSeconds(seconds) {
  // Just need an integer, may get passed in a float
  const time = Math.round(seconds);

  // Minutes and seconds
  let mins = ~~(time / 60); // eslint-disable-line no-bitwise
  let secs = time % 60;

  // Hours, minutes and seconds

  const hours = ~~(time / 3600); // eslint-disable-line no-bitwise
  mins = ~~((time % 3600) / 60); // eslint-disable-line no-bitwise
  secs = time % 60;

  // Output like "1:01" or "4:03:59" or "123:03:59"
  let formattedTime = '';

  if (hours > 0) {
    formattedTime += `${hours}:${(mins < 10 ? '0' : '')}`;
  }

  formattedTime += `${mins}:${(secs < 10 ? '0' : '')}`;
  formattedTime += `${secs}`;

  return formattedTime;
}
