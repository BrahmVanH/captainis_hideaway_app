const { getImages } = require('./s3Query');



// Takes in alt tags, gallery image urls and header url from property pages and
// formats an array for image gallery in client
const createImgGalArr = (galleryAltTags, imageUrls, headerUrl) => {
	let galleryArray = [];
	imageUrls.map((url) => {
		const original = url;
		galleryArray.push({
			original: original,
			thumbnail: original,
			originalAlt: null,
			thumbnailAlt: null,
		});
	});
	for (let i = 0; i < galleryArray.length; i++) {
		galleryArray[i].originalAlt = galleryAltTags[i];
		galleryArray[i].thumbnailAlt = galleryAltTags[i];
	}
	// this one works
	return { headerUrl, galleryArray };
};

// Retrieves Home page image URLs from server-side S3 query

const getHomeImgUrls = async () => {
	try {
		const { headerImgUrl, hideawayImgUrl, cottageImgUrl } = await getImages('homePage');

		if (headerImgUrl && hideawayImgUrl && cottageImgUrl) {
			return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
		}
	} catch (err) {
		throw new Error('there was an error fetching homepage images');
	}
};

// Retrieves hideaway property page image URLs from server-side S3 query
const getHideawayImgUrls = async () => {
	try {
		const { headerUrl, hideawayGalleryObjects } = await getImages('hideawayImgPack');
		const hideawayGalleryAltTags = hideawayGalleryObjects.map((object) => {
			return object.altTag;
		});
		const hideawayGalleryUrls = hideawayGalleryObjects.map((object) => {

			return object.signedUrl;
		});
		if (hideawayGalleryUrls.length > 0 && hideawayGalleryAltTags.length > 0 && headerUrl) {
			const response = createImgGalArr(hideawayGalleryAltTags, hideawayGalleryUrls, headerUrl);
			if (response) {
				return response;
			}
		}
	} catch (err) {
		throw new Error('there was an error fetching hideaway images');
	}
};

// Retrieves cottage property page image URLs from server-side S3 query

const getCottageImgUrls = async () => {
	try {
		const { headerUrl, cottageGalleryObjects } = await getImages('cottageImgPack');
		const cottageGalleryAltTags = cottageGalleryObjects.map((object) => {
			return object.altTag;
		});
		const cottageGalleryUrls = cottageGalleryObjects.map((object) => {
			return object.signedUrl;
		});
		if (cottageGalleryUrls.length > 0 && cottageGalleryAltTags.length > 0 && headerUrl) {
			const response = createImgGalArr(cottageGalleryAltTags, cottageGalleryUrls, headerUrl);
			if (response) {
				return response;
			}
		}
	} catch (err) {
		throw new Error('there was an error fetching cottage images');
	}
};

// Retrieves about us image URLs from server-side S3 query

const getAboutImgUrl = async () => {
	try {
		const cardImgUrl = await getImages('aboutPage');
		if (headerImgUrl && hideawayImgUrl && cottageImgUrl) {
			return { cardImgUrl };
		}
	} catch (err) {
		throw new Error('there was an error fetching about image');
	}
};

module.exports = { getHideawayImgUrls, getCottageImgUrls, getAboutImgUrl, getHomeImgUrls };
