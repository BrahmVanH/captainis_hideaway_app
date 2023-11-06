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
export const cottageGalleryImages = createCottageGalleryImages();
