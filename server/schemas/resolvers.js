const { AuthenticationError } = require('apollo-server-express');
const { UnavailableDate, User } = require('../models');
const { signToken } = require('../utils/auth');
const { getImages } = require('../utils/s3Query');
const { getHideawayImgUrls, getCottageImgUrls, getHomeImgUrls, getAboutImgUrl } = require('../utils/gallery_image_helpers');

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
					throw new Error('No property name was presented for querying dates');
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
		getHomePgImgs: async () => {
			try {
				const { headerImgUrl, hideawayImgUrl, cottageImgUrl } = await getImages('homePage');
				if (!headerImgUrl || !hideawayImgUrl || !cottageImgUrl) {
					throw new Error('Something went wrong in fetching object from s3');
				}
				if (headerImgUrl && hideawayImgUrl && cottageImgUrl) {
					return { headerImgUrl, hideawayImgUrl, cottageImgUrl };
				}
			} catch (err) {
				return [{ message: 'Error in getHomePgImgs...', details: err.message }];
			}
		},
		getHideawayImgs: async () => {
			try {
				const objectResponse = await getHideawayImgUrls();

				if (!objectResponse) {
					throw new Error('Something went wrong in fetching hideaway object from S3');
				} else if (objectResponse) {
					return objectResponse;
				} else {
					return null;
				}
			} catch (err) {
				return [{ message: 'Error in getHideawayImages...', details: err.message }];
			}
		},
		getCottageImgs: async () => {
			try {
				const objectResponse = await getCottageImgUrls();
				if (!objectResponse) {
					throw new Error('Something went wrong in fetching cottage object from S3');
				} else if (objectResponse) {
					return objectResponse;
				} else {
					return null;
				}
			} catch (err) {
				return [{ message: 'Error in getCottageImgs...', details: err.message }];
			}
		},
		getAboutPgImg: async () => {
			try {
				const objectResponse = await getAboutImgUrl();
				if (!objectResponse) {
					throw new Error('Something went wrong in fetching object from s3');
				}
				if (objectResponse) {
					return objectResponse;
				}
			} catch (err) {
				return [{ message: 'Error in getHomePgImgs...', details: err.message }];
			}
		},
	},
	Mutation: {
		createUser: async (parent, { firstName, lastName, username, userPassword, adminCode }) => {
			try {
				if (!firstName || !lastName || !username || !userPassword || !adminCode) {
					throw new AuthenticationError('All fields must be filled to create a user.');
				} else if (adminCode !== process.env.ADMIN_CODE) {
					throw new AuthenticationError('Incorrect admin code');
				} else {
					const newUser = await User.create({
						firstName,
						lastName,
						username,
						password: userPassword,
					});

					if (!newUser) {
						throw new AuthenticationError('There was an error creating user. Try again.');
					}

					const token = signToken(newUser);

					return { token, newUser };
				}
			} catch (err) {
				throw new Error('Error in creating user: ' + err.message);
			}
		},
		loginUser: async (parent, { username, userPassword }) => {
			try {
				if (!username || !userPassword) {
					throw new Error('username and password fields must be filled to log in');
				}
				const user = await User.findOne({ username });
				if (!user) {
					throw new AuthenticationError("Can't find user with that username");
				}

				const isPasswordValid = user.isCorrectPassword(userPassword);

				if (!isPasswordValid) {
					throw new AuthenticationError('Incorrect Password!');
				}

				const token = signToken(user);
				return { token, user };
			} catch (err) {
				throw new Error('Error in logging in user: ' + err.message);
			}
		},
		removeUser: async (parent, { username, userPassword }) => {
			try {
				if (!username) {
					throw new Error('username  fields must be filled to remove');
				}
				const user = await User.findOneAndRemove({ username });
				if (!user) {
					throw new AuthenticationError("Can't find user with that username");
				}

				if (user) {
					return { user };
				}
			} catch (err) {
				throw new Error('Error in removing in user: ' + err.message);
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
