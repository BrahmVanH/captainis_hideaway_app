const fullSizeHideawayImages = require.context('../assets/img/captains_hideaway_png', false, /\.(png|jpe?g|gif|svg)$/);
const fullSizeCottageImages = require.context('../assets/img/captains_cottage_png', false, /\.(png|jpe?g|gif|svg)$/);

const hideawayThumbnails100 = require.context('../assets/img/thumbnails/hideaway_thumbnails100_png', false, /\.(png|jpe?g|gif|svg)$/);
const hideawayThumbnails150 = require.context('../assets/img/thumbnails/hideaway_thumbnails150_png', false, /\.(png|jpe?g|gif|svg)$/);
const hideawayThumbnails300 = require.context('../assets/img/thumbnails/hideaway_thumbnails300_png', false, /\.(png|jpe?g|gif|svg)$/);

const cottageThumbnails100 = require.context('../assets/img/thumbnails/cottage_thumbnails100_png', false, /\.(png|jpe?g|gif|svg)$/);
const cottageThumbnails150 = require.context('../assets/img/thumbnails/cottage_thumbnails150_png', false, /\.(png|jpe?g|gif|svg)$/);
const cottageThumbnails300 = require.context('../assets/img/thumbnails/cottage_thumbnails300_png', false, /\.(png|jpe?g|gif|svg)$/);

let hideawayThumbnailsResponsive;
let cottageThumbnailsResponsive;
const isMobileViewport = () => {
	return window.innerWidth < 577;
};

const isMediumViewport = () => {
	return window.innerWidth < 766;
};

const getWindowHeight = () => {
	console.log(window.innerHeight);
}
const createOriginalHideawayGalleryImages = () => {
	let originalImageArray = [];
	fullSizeHideawayImages.keys().map((file) => {
		const original = fullSizeHideawayImages(file);

		originalImageArray.push(original);
	});
	return originalImageArray;
};

const createOriginalCottageGalleryImages = () => {
	let originalImageArray = [];
	fullSizeCottageImages.keys().map((file) => {
		const original = fullSizeCottageImages(file);

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

const createThumbnailCottageGalleryImages = () => {
	let thumbnailImages;
	if (isMobileViewport) {
		thumbnailImages = cottageThumbnails100;
	} else if (isMediumViewport) {
		thumbnailImages = cottageThumbnails150;
	} else {
		thumbnailImages = cottageThumbnails300;
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

	let galleryImages = [];
	for (let i = 0; i < originals.length; i++) {
		galleryImages.push({
			original: originals[i],
			thumbnail: thumbnails[i],
		});
	}

	return galleryImages;
};

const createCottageGalleryImages = () => {
	const originals = createOriginalCottageGalleryImages();
	const thumbnails = createThumbnailCottageGalleryImages();

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
export const cottageGalleryImages = createCottageGalleryImages();
