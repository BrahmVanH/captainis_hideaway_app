import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
	secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
	region: 'us-east-2',
});

const s3 = new AWS.S3();

const findImgIndex = (data, imgKey) => {
	const foundIndexes = data.Contents.map((image, index) => (image.Key === imgKey ? index : -1)).filter((index) => index !== -1);
	if (foundIndexes) {
		return foundIndexes;
	} else {
		return 0;
	}
};

const getSignedUrl = (imageItem) => {
	return s3.getSignedUrl('getObject', {
		Bucket: 'lakesuperiorcaptains',
		Key: imageItem.Key,
		Expires: 60,
	});
};

export const getImages = async (objectRequest) => {
	const bucketName = 'lakesuperiorcaptains';
	const hideawayHeaderImgKey = 'captains_hideaway_png/stairs_from_beach_rotated.png';
	const homeHeaderImgKey = 'captains_hideaway_png/arial_shot_over_beach_side.png';
	const params = {
		Bucket: bucketName,
		Prefix: 'captains_hideaway_png/',
	};

	let hideawayGalleryUrls;
	let hideawayHeaderUrl;
	let homeHeaderUrl;
	let objectResponse;

	const tobeCottageGal = 'cottageGallery';
	const tobeCottageHead = 'cottageHeader';
	const tobeAbout = 'about';
	if (objectRequest === 'hideawayGallery') {
		try {
			const data = await s3.listObjectsV2(params).promise();

			if (data) {
				hideawayGalleryUrls = await data?.Contents.map((item) => {
					return getSignedUrl(item);
				});

				objectResponse = hideawayGalleryUrls;
				return objectResponse;
			} else if (!data) {
				throw new Error('Could not retrieve images from S3');
			}
		} catch (err) {
			return [{ message: 'Error in querying s3 for images', details: err.message }];
		}
	} else if (objectRequest === 'hideawayHeader') {
		try {
			const data = await s3.listObjectsV2(params).promise();
			if (data) {
				const hideawayHeaderImgIndex = findImgIndex(data, hideawayHeaderImgKey)[0];
				hideawayHeaderUrl = await getSignedUrl(data.Contents[hideawayHeaderImgIndex]);

				objectResponse = hideawayHeaderUrl;
				return objectResponse;
			} else if (!data) {
				throw new Error('Could not retrieve images from S3');
			}
		} catch (err) {
			return [{ message: 'Error in querying s3 for images', details: err.message }];
		}
	} else if (objectRequest === 'homeHeader') {
		try {
			const data = await s3.listObjectsV2(params).promise();
			if (data) {
				const homeheaderImgIndex = findImgIndex(data, homeHeaderImgKey)[0];
				homeHeaderUrl = await getSignedUrl(data.Contents[homeheaderImgIndex]);

				objectResponse = homeHeaderUrl;
				return objectResponse;
			} else if (!data) {
				throw new Error('Could not retrieve images from S3');
			}
		} catch (err) {
			return [{ message: 'Error in querying s3 for images', details: err.message }];
		}
	}
};
