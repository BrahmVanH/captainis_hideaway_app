import AWS from 'aws-sdk';

AWS.config.update({
	accessKeyId: process.env.REACT_APP_S3_ACCESS_KEY,
	secretAccessKey: process.env.REACT_APP_S3_SECRET_ACCESS_KEY,
	region: 'us-east-2',
});

const s3 = new AWS.S3();
const bucketName = 'lakesuperiorcaptains';

export const getImages = async () => {
	console.log('getting images...');
	const bucketName = 'lakesuperiorcaptains';
	const params = {
		Bucket: bucketName,
		Prefix: 'captains_hideaway_png/',
	};

	try {
		const data = await s3.listObjectsV2(params).promise();

		if (!data) {
			throw new Error('Could not retrieve images from S3');
		}
    console.log(data);

		const imageUrls = await data?.Contents.map((item) => {
			return s3.getSignedUrl('getObject', {
				Bucket: 'lakesuperiorcaptains',
				Key: item.Key,
				Expires: 60,
			});
		});
    console.log(imageUrls);

    return imageUrls;
	
	} catch (err) {
		return [{ message: 'Error in querying s3 for images', details: err.message }];
	}
};

