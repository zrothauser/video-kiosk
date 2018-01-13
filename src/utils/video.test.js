import {
  extractVimeoIDFromURL,
  convertSecondsToMinutesSeconds,
} from './video';

describe('helper functions', () => {
  test('extracting vimeo ID from URL', () => {
    const validURL = 'https://vimeo.com/161505682';
    const invalidURL = 'https://youtube.com/1000';
    const invalidType = {};

    expect(extractVimeoIDFromURL(validURL)).toBe(161505682);
    expect(extractVimeoIDFromURL(invalidURL)).toBe(null);
    expect(extractVimeoIDFromURL(invalidType)).toBe(null);
  });

  test('converting time in seconds to a readable time', () => {
    expect(convertSecondsToMinutesSeconds(100)).toBe('1:40');
    expect(convertSecondsToMinutesSeconds(0)).toBe('0:00');
    expect(convertSecondsToMinutesSeconds(null)).toBe('0:00');
  });
});
