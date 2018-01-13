import {
	extractVimeoIDFromURL,
	extractVideoIDsFromCategoryData,
	extractVideoIDsFromCompleteData
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
});