import { getImages } from './s3Query';
import { hideawayAmenities } from './captainsHideawayAmenities';

const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

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

export const getHideawayImgUrls = async () => {
	try {
		const hideawayGalleryUrls = await getImages('hideawayGallery');
		if (hideawayGalleryUrls.length > 0) {
			return createHideawayImgGalArr(hideawayGalleryUrls);
		} else {
			console.log('no images yet');
			return null;
		}
	} catch (err) {
		throw new Error('there was an error fetching images');
	}
};

const createHideawayImgGalArr = (imageUrls) => {
	let galleryArray = [];
	imageUrls.map((url) => {
		const original = url;

		galleryArray.push({
			original: original,
			thumbnail: original,
		});
	});
	return galleryArray;
};

export const getAllImgs = async () => {
	try {
		const { hideawayGalleryUrls, hideawayHeaderUrl, homeHeaderUrl } = await getHideawayImgUrls();
		if (hideawayGalleryUrls.length > 0) {
			const hideawayImgGalArr = createHideawayImgGalArr(hideawayGalleryUrls);

			return { hideawayImgGalArr, hideawayHeaderUrl };
		} else {
			console.log('couldnt create image gallery array');
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
