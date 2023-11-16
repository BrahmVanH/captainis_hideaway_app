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

const getHideawayImgUrls = async () => {
	try {
		const { hideawayGalleryUrls, hideawayHeaderUrl } = await getImages();
		if (hideawayGalleryUrls.length > 0 && hideawayHeaderUrl != null) {
			// console.log(hideawayGalleryUrls, hideawayHeaderUrl);
			return { hideawayGalleryUrls, hideawayHeaderUrl };
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

export const getHideawayImgs = async () => {
	try {
		const { hideawayGalleryUrls, hideawayHeaderUrl } = await getHideawayImgUrls();
		// console.log(hideawayGalleryUrls, hideawayHeaderUrl);
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
