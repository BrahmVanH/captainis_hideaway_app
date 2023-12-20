const AWS = require('aws-sdk');

if (process.env.NODE_ENV !== 'production') {
	AWS.config.loadFromPath('./utils/awsCredentials.json');
} else if (process.env.NODE_ENV == 'production') {
	AWS.config.update({
		accessKeyId: process.env.S3_ACCESS_KEY,
		secretAccessKey: process.env.S3_SECRET_ACCESS_KEY,
		region: process.env.S3_REGION,
	});
}

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

const getImgTags = async (imageBucket, imageItems) => {
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

const getImages = async (objectRequest) => {
	const bucketName = 'lakesuperiorcaptains';

	const homeHeaderImgKey = 'home_page/arial_shot_over_beach_side.png';
	const homePgHideawayImgKey = 'home_page/stairs_from_beach_2.png';
	const homePgCottageImgKey = 'home_page/back_exterior_side_with_lake.png';
	const homePageParams = {
		Bucket: bucketName,
		Prefix: 'home_page/',
	};

	const hideawayHeaderImgKey = 'captains_hideaway_png/stairs_from_beach_rotated.png';
	const hideawayParams = {
		Bucket: bucketName,
		Prefix: 'captains_hideaway_png/',
	};

	const cottageHeaderImgKey = 'captains_cottage_png/back_exterior_side_with_lake.png';
	const cottageParams = {
		Bucket: bucketName,
		Prefix: 'captains_cottage_png/',
	};

	const aboutImgKey = 'about_us.jpg';

	let hideawayGalleryUrls;
	
	let objectResponse;

	const tobeCottageGal = 'cottageGallery';
	const tobeCottageHead = 'cottageHeader';
	const tobeAbout = 'about';

	switch (objectRequest) {
		case 'hideawayGallery':
			try {
				const data = await s3.listObjectsV2(hideawayParams).promise();
				if (data) {
					hideawayGalleryUrls = data?.Contents.map((item) => {
						return getSignedUrl(hideawayParams.Bucket, item);
					});
					const objectResponse = hideawayGalleryUrls;
					return objectResponse;
				} else if (!data) {
					throw new Error('Could not retrieve images from S3');
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for images', details: err.message }];
			}
		case 'hideawayGalleryAltTags':
			try {
				const data = await s3.listObjectsV2(hideawayParams).promise();
				if (data) {
					const hideawayGalleryAltTags = await getImgTags(hideawayParams.Bucket, data);
					if (hideawayGalleryAltTags.length > 0) {
						const objectResponse = hideawayGalleryAltTags;
					}
					return objectResponse;
				} else if (!data) {
					throw new Error('Could not retrieve images from S3');
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for images', details: err.message }];
			}
		case 'hideawayHeader':
			try {
				const data = await s3.listObjectsV2(hideawayParams).promise();
				if (data) {
					const headerImgIndex = findImgIndex(data, hideawayHeaderImgKey)[0];
					const headerUrl = getSignedUrl(hideawayParams.Bucket, data.Contents[headerImgIndex]);

					const objectResponse = headerUrl;
					return objectResponse;
				} else if (!data) {
					throw new Error('Could not retrieve images from S3');
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for hideaway images', details: err.message }];
			}
		case 'homePage':
			try {
				const data = await s3.listObjectsV2(homePageParams).promise();
				if (data) {
					const headerImgIndex = findImgIndex(data, homeHeaderImgKey);
					const headerImgUrl = getSignedUrl(homePageParams.Bucket, data.Contents[headerImgIndex]);

					const hideawayImgIndex = findImgIndex(data, homePgHideawayImgKey)[0];
					const hideawayImgUrl = getSignedUrl(homePageParams.Bucket, data.Contents[hideawayImgIndex]);

					const cottageImgIndex = findImgIndex(data, homePgCottageImgKey)[0];
					const cottageImgUrl = getSignedUrl(homePageParams.Bucket, data.Contents[cottageImgIndex]);

					return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
			}
		case 'aboutPage':
			try {
				const data = await s3.getObject(bucketName, aboutImgKey).promise();
				if (data) {
					const imgUrl = getSignedUrl(data);

					return imgUrl;
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for homepage images', details: err.message }];
			}
		default:
			return null;
	}
};

module.exports = { getImages };
