const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

const hideawayThumbnails100 = require.context('../assets/img/thumbnails/hideaway_thumbnails100_png', false, /\.(png|jpe?g|gif|svg)$/);
const hideawayThumbnails150 = require.context('../assets/img/thumbnails/hideaway_thumbnails150_png', false, /\.(png|jpe?g|gif|svg)$/);
const hideawayThumbnails300 = require.context('../assets/img/thumbnails/hideaway_thumbnails300_png', false, /\.(png|jpe?g|gif|svg)$/);

const cottageThumbnails100 = require.context('../assets/img/thumbnails/cottage_thumbnails_100', false, /\.(png|jpe?g|gif|svg)$/);
const cottageThumbnails150 = require.context('../assets/img/thumbnails/cottage_thumbnails_150', false, /\.(png|jpe?g|gif|svg)$/);
const cottageThumbnails300 = require.context('../assets/img/thumbnails/cottage_thumbnails_300', false, /\.(png|jpe?g|gif|svg)$/);

let hideawayThumbnailsResponsive;
let cottageThumbnailsResponsive;
const isMobileViewport = () => {
	return window.innerWidth < 577;
};


const isMediumViewport = () => {
	return window.innerWidth < 766;
};

const isLargeViewport = () => {
	return window.innerWidth > 766;
};

const selectThumnailSize = () => {
	if (isMobileViewport) {
		console.log('this is a mobile viewport!');
		hideawayThumbnailsResponsive = hideawayThumbnails100;
	} else if (isMediumViewport) {
		console.log('this is a medium viewport!');
		hideawayThumbnailsResponsive = hideawayThumbnails150;
	} else {
		console.log('this is a large viewport!');

		hideawayThumbnailsResponsive = hideawayThumbnails300;
	}
};

const createOriginalHideawayGalleryImages = () => {
	let originalImageArray = [];
	fullSizeHideawayImages.keys().map((file) => {
		const original = fullSizeHideawayImages(file);
		console.log('Original Image:', original);

		originalImageArray.push(original);
	});
	return originalImageArray;
};

const createThumbnailHideawayGalleryImages = () => {
	let thumbnailImages;
	if (isMobileViewport) {
		thumbnailImages = hideawayThumbnails100;
	} else if (isMediumViewport) {
		thumbnailImages = hideawayThumbnails150;
	} else {
		thumbnailImages = hideawayThumbnails300;
	}

	let thumbnailArray = [];
	thumbnailImages.keys().map((file) => {
		const thumbnail = thumbnailImages(file);

		thumbnailArray.push(thumbnail);
	});
	return thumbnailArray;
};

const createHideawayGalleryImages = () => {
	const originals = createOriginalHideawayGalleryImages();
	const thumbnails = createThumbnailHideawayGalleryImages();

	if (originals.length != thumbnails.length) {
		console.log('The lengths of the image arrays do not match');
	}
	let galleryImages = [];
	for (let i = 0; i < originals.length; i++) {
		galleryImages.push({
			original: originals[i],
			thumbnail: thumbnails[i],
		});
	}

	return galleryImages;
};

export const hideawayGalleryImages = createHideawayGalleryImages();

console.log('Gallery Images:', hideawayGalleryImages);
