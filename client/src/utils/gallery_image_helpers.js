// import { QUERY_S3_OBJECTS } from './queries';
// import { useQuery } from '@apollo/client';
import { getImages } from './s3Query';


const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

// Creates an array of gallery images for react-image-gallery
const createCottageGalleryImages = () => {
	let array = [];
	fullSizeCottageImages.keys().map((file) => {
		const original = fullSizeCottageImages(file);

		array.push({
			original: original,
			thumbnail: original,
		});
	});
	return array;
};

// Retrieves image URLs from server-side S3 query
export const getHideawayImgUrls = async () => {
	try {
		const hideawayGalleryUrls = await getImages('hideawayGallery');
		const hideawayGalleryAltTags = await getImages('hideawayGalleryAltTags');
		if (hideawayGalleryUrls.length > 0) {
			return createHideawayImgGalArr(hideawayGalleryAltTags, hideawayGalleryUrls);
		}
	} catch (err) {
		throw new Error('there was an error fetching images');
	}
};

const createHideawayImgGalArr = (hideawayGalleryAltTags, imageUrls) => {
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
		galleryArray[i].originalAlt = hideawayGalleryAltTags[i];
		galleryArray[i].thumbnailAlt = hideawayGalleryAltTags[i];
	}
	return galleryArray;
};

export const getAllImgs = async () => {
	try {
		const { hideawayGalleryUrls, hideawayHeaderUrl, homeHeaderUrl } = await getHideawayImgUrls();
		if (hideawayGalleryUrls.length > 0) {
			const hideawayImgGalArr = createHideawayImgGalArr(hideawayGalleryUrls);

			return { hideawayImgGalArr, hideawayHeaderUrl };
		} else {
			console.error('couldnt create image gallery array');
		}
	} catch (err) {
		console.error('there was an error getting hideaway gallery url array', err);
	}
};

// export const hideawayImgUrls = await getHideawayGalleryArray();

export const cottageGalleryImages = createCottageGalleryImages();
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

export const hideawayGalleryImages = createHideawayGalleryImages();
