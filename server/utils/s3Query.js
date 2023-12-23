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

const getImgTag = async (imageBucket, imageItem) => {
	try {
		if (imageItem) {
			const altTag = await s3
				.getObjectTagging({
					Bucket: imageBucket,
					Key: imageItem?.Key,
				})
				.promise();

			if (altTag) {
				// console.log('altTag.tagSet: ', altTag.TagSet[0]?.Value);
				return altTag.TagSet[0]?.Value;
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
						return hideawayGalleryAltTags;
					} else {
						return null;
					}
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
					if (headerUrl) {
						return headerUrl;
					} else {
						return null;
					}
				} else if (!data) {
					throw new Error('Could not retrieve images from S3');
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for hideaway images', details: err.message }];
			}
		case 'cottageImgPack':
			try {
				const data = await s3.listObjectsV2(cottageParams).promise();
				if (data) {
					const headerImgIndex = findImgIndex(data, cottageHeaderImgKey)[0];
					const headerUrl = getSignedUrl(cottageParams.Bucket, data.Contents[headerImgIndex]);

					const cottageGalleryObjects = await Promise.all(
						data?.Contents.map(async (item) => {
							const altTag = await getImgTag(cottageParams.Bucket, item);
							const signedUrl = getSignedUrl(cottageParams.Bucket, item);
							console.log({ altTag, signedUrl });
							if ((altTag, signedUrl)) {
								return { altTag, signedUrl };
							} else {
								return null;
							}
						})
					);

					// const cottageGalleryData = await Promise.all(
					// 	data?.Contents.map(async (item) => {
					// 		const imageUrl = getSignedUrl(cottageParams.Bucket, item);
					// 		const altTag = await getImgTags(cottageParams.Bucket, item);
					// 		return { imageUrl, altTag: altTag[0] || null };
					// 	})
					// );

					// const cottageGalleryUrls = cottageGalleryData.map((item) => item.imageUrl);
					// const cottageGalleryAltTags = cottageGalleryData.map((item) => item.altTag);

					if (headerUrl && cottageGalleryObjects[0] !== undefined) {
					
						console.log('gallery objects: ', cottageGalleryObjects);
						return { headerUrl, cottageGalleryObjects };
					}
				}
			} catch (err) {
				return [{ message: 'Error in querying s3 for cottage images', details: err.message }];
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
