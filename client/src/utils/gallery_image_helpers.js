const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

const hideawayThumbnails100 = require.context('../assets/img/thumbnails/hideaway_thumbnails_100', false, /\.avif$/);
const hideawayThumbnails150 = require.context('../assets/img/thumbnails/hideaway_thumbnails_150', false, /\.avif$/);
const hideawayThumbnails300 = require.context('../assets/img/thumbnails/hideaway_thumbnails_300', false, /\.avif$/);

const cottageThumbnails100 = require.context('../assets/img/thumbnails/cottage_thumbnails_100', false, /\.avif$/);
const cottageThumbnails150 = require.context('../assets/img/thumbnails/cottage_thumbnails_150', false, /\.avif$/);
const cottageThumbnails300 = require.context('../assets/img/thumbnails/cottage_thumbnails_300', false, /\.avif$/);

 const createHideawayGalleryImages = () => {
	let array = [];
	fullSizeHideawayImages.keys().map((file) => {
		const original = fullSizeHideawayImages(file);
		console.log('Original Image:', original);

		array.push({
			original: original,
			thumbnail: original,
		});
	});
	return array;
};

export const hideawayGalleryImages = createHideawayGalleryImages();

console.log('Gallery Images:', hideawayGalleryImages);
