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

const getSignedUrl = (imageBucket, imageItem) => {
	return s3.getSignedUrl('getObject', {
		Bucket: imageBucket,
		Key: imageItem.Key,
		Expires: 60,
	});
};

// Takes in the object list from S3 bucket, parses the image's unique key
// and returns as array
const parseS3ImgTags = (listObjectsData) => {
	const imgKeys = [];
	if (listObjectsData) {
		const contents = listObjectsData.contents;
		contents.map((imgObject) => {
			// const splitKey = imgObject.Key.split('/');
			// imgKeys.push(splitKey[1]);
			imgKeys.push(imgObject.Key);
		});
	}

	return imgKeys;
};

export const getImgTags = async (imageBucket, imageItems) => {
	try {
		if (imageItems) {
			const taggingData = [];

			await Promise.all(
				imageItems.Contents.map(async (item) => {
					try {
						const response = await s3
							.getObjectTagging({
								Bucket: imageBucket,
								Key: item.Key,
							})
							.promise();

						if (response.TagSet[0]) {
							taggingData.push(response.TagSet[0].Value);
						}
					} catch (error) {
						console.error('Error retrieving image tags for', item.Key, error);
					}
				})
			);
			if (taggingData.length > 0) {
				return taggingData;
			}
		}
	} catch (err) {
		console.error('there was an error in retrieving image tags', err);
	}
};


export const getImages = async (objectRequest) => {
	const bucketName = 'lakesuperiorcaptains';
	const hideawayHeaderImgKey = 'captains_hideaway_png/stairs_from_beach_rotated.png';
	const homeHeaderImgKey = 'captains_hideaway_png/arial_shot_over_beach_side.png';
	const hideawayParams = {
		Bucket: bucketName,
		Prefix: 'captains_hideaway_png/',
	};

	let hideawayGalleryUrls;
	let hideawayGalleryAltTags;
	let hideawayHeaderUrl;
	let homeHeaderUrl;
	let objectResponse;

	const tobeCottageGal = 'cottageGallery';
	const tobeCottageHead = 'cottageHeader';
	const tobeAbout = 'about';
	if (objectRequest === 'hideawayGallery') {
		try {
			const data = await s3.listObjectsV2(hideawayParams).promise();
			if (data) {
				hideawayGalleryUrls = await data?.Contents.map((item) => {
					return getSignedUrl(hideawayParams.Bucket, item);
				});
				objectResponse = hideawayGalleryUrls;
				return objectResponse;
			} else if (!data) {
				throw new Error('Could not retrieve images from S3');
			}
		} catch (err) {
			return [{ message: 'Error in querying s3 for images', details: err.message }];
		}
	} else if (objectRequest === 'hideawayGalleryAltTags') {
		try {
			const data = await s3.listObjectsV2(hideawayParams).promise();
			if (data) {
				const hideawayGalleryAltTags = await getImgTags(hideawayParams.Bucket, data);
				if (hideawayGalleryAltTags.length > 0) {
					objectResponse = hideawayGalleryAltTags;
				}
				return objectResponse;
			} else if (!data) {
				throw new Error('Could not retrieve images from S3');
			}
		} catch (err) {
			return [{ message: 'Error in querying s3 for images', details: err.message }];
		}
	} else if (objectRequest === 'hideawayHeader') {
		try {
			const data = await s3.listObjectsV2(hideawayParams).promise();
			if (data) {
				const hideawayHeaderImgIndex = findImgIndex(data, hideawayHeaderImgKey)[0];
				hideawayHeaderUrl = await getSignedUrl(hideawayParams.Bucket, data.Contents[hideawayHeaderImgIndex]);

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
			const data = await s3.listObjectsV2(hideawayParams).promise();
			if (data) {
				const homeheaderImgIndex = findImgIndex(data, homeHeaderImgKey)[0];
				homeHeaderUrl = await getSignedUrl(hideawayParams.Bucket, data.Contents[homeheaderImgIndex]);

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
