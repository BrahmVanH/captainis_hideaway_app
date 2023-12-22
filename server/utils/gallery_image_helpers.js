// import { getImages } from './s3Query';
const { getImages } = require('./s3Query');

// const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
// const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

// // Creates an array of gallery images for react-image-gallery
// const createCottageGalleryImages = () => {
// 	let array = [];
// 	fullSizeCottageImages.keys().map((file) => {
// 		const original = fullSizeCottageImages(file);

// 		array.push({
// 			original: original,
// 			thumbnail: original,
// 		});
// 	});
// 	return array;
// };

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

// Retrieves image URLs from server-side S3 query
const getHideawayImgUrls = async () => {
	try {
		const hideawayGalleryUrls = await getImages('hideawayGallery');

		const hideawayGalleryAltTags = await getImages('hideawayGalleryAltTags');
		const hideawayHeaderUrl = await getImages('hideawayHeader');
		if (hideawayGalleryUrls.length > 0 && hideawayGalleryAltTags.length > 0 && hideawayHeaderUrl) {
			// this one is working
			return createImgGalArr(hideawayGalleryAltTags, hideawayGalleryUrls, hideawayHeaderUrl);
		}
	} catch (err) {
		throw new Error('there was an error fetching hideaway images');
	}
};

const getCottageImgUrls = async () => {
	try {
		const cottageGalleryUrls = await getImages('cottageGallery');
		const cottageGalleryAltTags = await getImages('cottageGalleryAltTags');
		const cottageHeaderUrl = await getImages('cottageHeader');
		if (hideawayGalleryUrls.length > 0 && hideawayGalleryAltTags.length > 0 && hideawayHeaderUrl) {
			const response = createImgGalArr(cottageGalleryAltTags, cottageGalleryUrls, cottageHeaderUrl);
			if (response) {

				console.log(response);
				return response;
			}
		}
	} catch (err) {
		throw new Error('there was an error fetching cottage images');
	}
};

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

const getAllImgs = async () => {
	try {
		const { hideawayGalleryUrls, hideawayHeaderUrl } = await getHideawayImgUrls();
		if (hideawayGalleryUrls.length > 0 && hideawayHeaderUrl) {
			const hideawayImgGalArr = createHideawayImgGalArr(hideawayGalleryUrls);
			console.log("yahooh: ", ideawayHeaderUrl);
			return { hideawayImgGalArr, hideawayHeaderUrl };
		} else {
			console.error('couldnt create image gallery array');
		}
	} catch (err) {
		console.error('there was an error getting hideaway gallery url array', err);
	}
};

// export const hideawayImgUrls = await getHideawayGalleryArray();

// const cottageGalleryImages = createCottageGalleryImages();
const createHideawayGalleryImages = () => {
	let array = [];
	fullSizeHideawayImages.keys().map((file) => {
		const original = fullSizeHideawayImages(file);

		array.push({
			original: original,
			thumbnail: original,
		});
	});
	return array;
};

// const hideawayGalleryImages = createHideawayGalleryImages();

module.exports = { getHideawayImgUrls, getCottageImgUrls, getAboutImgUrl, getHomeImgUrls };
