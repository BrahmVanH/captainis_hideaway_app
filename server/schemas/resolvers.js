const { AuthenticationError } = require('apollo-server-express');
const { UnavailableDate, User } = require('../models');
const { signToken } = require('../utils/auth');
const bcrypt = require('bcrypt');

const resolvers = {
	Query: {
		getAllUsers: async () => {
			try {
				const allUsers = await User.find({});

				if (!allUsers) {
					throw new Error('Cannot find user with that ID!');
				}

				return allUsers;
			} catch (err) {
				console.error({ message: 'error in finding user', details: err });
			}
		},
		queryUnavailableDatesByProperty: async (parent, { propertyName }) => {
			try {
				if (!propertyName) {
					throw new Error("No property name was presented for querying dates");
				}
				const dates = await UnavailableDate.find({ propertyName: propertyName });
				if (!dates) {
					throw new Error('Cannot find all dates in database');
				}
				return dates;
			} catch (err) {
				return [{ message: 'Error in queryUnavailableDates...', details: err.message }];
			}
		},
		getImages: async () => {
			const bucketName = 'lakesuperiorcaptains';
			const params = {
				Bucket: bucketName,
				Prefix: 'images/'
			};

			try {
				const data = await s3.listObjectsV2(params).promise();

				if (!data) {
					throw new Error('Could not retrieve images from S3');
				}

				const imageUrls = data.Contents.map((item) => {
					return s3.getSignedUrl('getObject', {
						Bucket: 'lakesuperiorcaptains',
						Key: item.Key,
						Expires: 60,
					});
				});

				return imageUrls;
			} catch (err) {
				return [{ message: 'Error in querying s3 for images', details: err.message }];

			}
		}
	},
	Mutation: {
		createUser: async (parent, { firstName, lastName, username, userPassword, adminCode }) => {
			try {
				if (!firstName || !lastName || !username || !userPassword || !adminCode) {
					throw new AuthenticationError('All fields must be filled to create a user.');
				} else if (adminCode !== process.env.ADMIN_CODE) {
					throw new AuthenticationError('Incorrect admin code');
				}
				const password = bcrypt.hashSync(userPassword, 10);

				const newUser = await User.create({
					firstName,
					lastName,
					username,
					password,
				});

				if (!newUser) {
					throw new AuthenticationError('There was an error creating user. Try again.');
				}

				const token = signToken(newUser);

				return { token, newUser };
			} catch (err) {
				throw new Error('Error in creating user: ' + err.message);
			}
		},
		loginUser: async (parent, { username, userPassword }) => {
			try {

				if (!username || !userPassword ) {
					throw new Error("username and password fields must be filled to log in")
				}
				const user = await User.findOne({ username });
				if (!user) {
					throw new AuthenticationError("Can't find user with that username");
				}

				const hashedPassword = user.password;
				
				const isPasswordValid = bcrypt.compareSync(userPassword, hashedPassword);

				if (!isPasswordValid) {
					throw new AuthenticationError('Incorrect Password!');
				}

				const token = signToken(user);
				return { token, user };
			} catch (err) {
				throw new Error('Error in logging in user: ' + err.message);
			}
		},
		createUnavailableDate: async (parent, { propertyName, dateValue }) => {
			try {
				if (!dateValue) {
					throw new Error('date object is undefined');
				} else if (!propertyName) {
					throw new Error('property name is undefined');
				}
				const unavailableDate = await UnavailableDate.create({ propertyName, dateValue });

				if (!unavailableDate) {
					throw new Error('Could not create new date');
				}
				return unavailableDate;
			} catch (err) {
				throw new Error('Error in creating date in db: ' + err.message);
			}
		},
		removeUnavailableDate: async (parent, { propertyName, dateValue }) => {
			try {
				if (!propertyName) {
					throw new Error('property name is undefined');
				} else if (!dateValue) {
					throw new Error('date object is undefined');
				}
				const unavailableDate = await UnavailableDate.findOneAndDelete({ propertyName, dateValue });
				if (!unavailableDate) {
					throw new Error('could not find unavailable date with that value...');
				}

				return unavailableDate;
			} catch (err) {
				throw new Error('Error in removing unavailable date from db: ' + err.message);
			}
		},
	},
};

module.exports = resolvers;
