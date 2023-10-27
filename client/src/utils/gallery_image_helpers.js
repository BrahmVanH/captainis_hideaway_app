const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

const hideawayThumbnails100 = require.context('../assets/img/thumbnails/hideaway_thumbnails_100', false, /\.avif$/);
const hideawayThumbnails150 = require.context('../assets/img/thumbnails/hideaway_thumbnails_150', false, /\.avif$/);
const hideawayThumbnails300 = require.context('../assets/img/thumbnails/hideaway_thumbnails_300', false, /\.avif$/);

const cottageThumbnails100 = require.context('../assets/img/thumbnails/cottage_thumbnails_100', false, /\.avif$/);
const cottageThumbnails150 = require.context('../assets/img/thumbnails/cottage_thumbnails_150', false, /\.avif$/);
const cottageThumbnails300 = require.context('../assets/img/thumbnails/cottage_thumbnails_300', false, /\.avif$/);

// let hideawayThumbnailsResponsive;
// let cottageThumbnailsResponsive;
// const isMobileViewport = () => {
// 	return window.innerWidth < 577;
// };

// const isMediumViewport = () => {
// 	return window.innerWidth < 766;
// };

// const isLargeViewport = () => {
// 	return window.innerWidth > 766;
// };

// const selectThumnailSize = () => {
// 	if (isMobileViewport) {
// 		console.log('this is a mobile viewport!');
// 		hideawayThumbnailsResponsive = hideawayThumbnails100;
// 	} else if (isMediumViewport) {
// 		console.log('this is a medium viewport!');
// 		hideawayThumbnailsResponsive = hideawayThumbnails150;
// 	} else {
// 		console.log('this is a large viewport!');

// 		hideawayThumbnailsResponsive = hideawayThumbnails300;
// 	}
// };

export const hideawayGalleryImages = fullSizeHideawayImages.keys().map((file) => {
	const original = fullSizeHideawayImages(file).default;
	console.log('Original Image:', original);

	return {
		original: original,
		thumbnail: original,
	};
});

console.log('Gallery Images:', hideawayGalleryImages);
