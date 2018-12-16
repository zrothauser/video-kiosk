import {
  convertSecondsToMinutesSeconds,
} from './video';

describe('helper functions', () => {
  test('converting time in seconds to a readable time', () => {
    expect(convertSecondsToMinutesSeconds(100)).toBe('1:40');
    expect(convertSecondsToMinutesSeconds(0)).toBe('0:00');
    expect(convertSecondsToMinutesSeconds(null)).toBe('0:00');
  });
});
