/**
 * Extracts the video ID from a Vimeo URL.
 *
 * For example, if passed https://vimeo.com/161505682, this
 * would return an integer 161505682.
 *
 * @param  string vimeoURL The URL to the video.
 * @return int             The video's ID, or null if misshapped URL.
 */
export const extractVimeoIDFromURL = (vimeoURL) => {

		// Return if we're not passed a string
    if (!vimeoURL || typeof vimeoURL !== 'string') {
        return null
    }

		// Split apart the URL and get the ID
    const urlParts = vimeoURL.split('/')
		const videoID = urlParts[urlParts.length - 1]

		// If it's invalid
		if (!urlParts[0] || !urlParts[0]) {
			return null;
		}

		// If it's not a Vimeo link, or there's no ID
		if (-1 === vimeoURL.indexOf('://vimeo.com') || !videoID) {
			return null;
		}

    return parseInt(videoID, 10)
}

/**
 * Helper function to get video IDs from a Category.
 */
export const extractVideoIDsFromCategoryData = categoryData => {
    // Start with all videos in the data
    const categoryVideos = categoryData.videos

    // Strip out ones that are missing the vimeo URL... there could be some
    const validCategoryVideos = categoryVideos.filter(video => video.video.vimeoid)

    // Strip down to the video IDs
    const videoIDs = validCategoryVideos.map(video => extractVimeoIDFromURL(video.video.vimeoid))
    const validatedVideoIDs = videoIDs.filter(videoID => typeof videoID === 'number')

    return validatedVideoIDs
}

/**
 * And helper function to get all video IDs from the data.
 */
export const extractVideoIDsFromCompleteData = completeData => {
    const rawData = completeData[0].set
    let allVideoIDs = []

    rawData.categories.forEach(category => {
        const videoIDs = extractVideoIDsFromCategoryData(category.category)

        allVideoIDs = [
            ...allVideoIDs,
            ...videoIDs
        ]
    })

    return allVideoIDs
}
