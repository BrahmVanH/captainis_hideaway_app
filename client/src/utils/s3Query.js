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

export const getImages = async () => {
	const bucketName = 'lakesuperiorcaptains';
	const headerImgKey = 'captains_hideaway_png/stairs_from_beach_rotated.png';
	const params = {
		Bucket: bucketName,
		Prefix: 'captains_hideaway_png/',
	};

	let hideawayGalleryUrls;
	let hideawayHeaderUrl;

	try {
		const data = await s3.listObjectsV2(params).promise();
		// console.log(data);

		if (data) {
			const headerImgIndex = findImgIndex(data, headerImgKey)[0];

			hideawayHeaderUrl = await getSignedUrl(data.Contents[headerImgIndex]);

			hideawayGalleryUrls = await data?.Contents.map((item) => {
				return getSignedUrl(item);
			});
			return { hideawayGalleryUrls, hideawayHeaderUrl };
		} else if (!data) {
			throw new Error('Could not retrieve images from S3');
		}
	} catch (err) {
		return [{ message: 'Error in querying s3 for images', details: err.message }];
	}
};
