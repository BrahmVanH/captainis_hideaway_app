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
		queryUnavailableDates: async () => {
			try {
				const dates = await UnavailableDate.find({});
				if (!dates) {
					throw new Error('Cannot find all dates in database');
				}
				return dates;
			} catch (err) {
				return [{ message: 'Error in queryUnavailableDates...', details: err.message }];
			}
		},
	},
	Mutation: {
		createUser: async (parent, { firstName, lastName, username, userPassword })=> {
			try {

				const password = bcrypt.hashSync(userPassword, 10);


				const newUser = await User.create({
					firstName,
					lastName,
					username,
					password,
				});
				
				if (!newUser) {
					throw new AuthenticationError("There was an error creating user. Try again.");
				}
				
				const token = signToken(newUser);
				
				return { token, newUser };
			} catch (err) {
				return [{ message: 'Error in creating user', details: err.message }];

			}
		},
		loginUser: async (parent, { username, userPassword }) => {
			try {
				const user = await User.findOne({ username });
				if (!user) {
					throw new AuthenticationError("Can't find user with that username");
				}

				const isPasswordValid = bcrypt.compareSync(userPassword, hashedPassword);


				if (!isPasswordValid) {
					throw new AuthenticationError('Incorrect Password!');
				}

				const token = signToken(user);

				return { token, user };
			} catch (err) {
				return [{ message: 'Error in logging in user', details: err.message }];
			}
		},
		createUnavailableDate: async (parent, { date }) => {
			console.log('creating unavailable date in server');
			try {
				if (!date) {
					throw new Error('date object is undefined');
				}
				const unavailableDate = await UnavailableDate.create({ dateValue: date });

				if (!unavailableDate) {
					throw new Error('Could not create new date');
				}
				console.log('successfully created unavailableDate...');
				return unavailableDate;
			} catch (err) {
				return [{ message: 'Something went wrong creating a new unavailable date...', details: err.message }];
			}
		},
		removeUnavailableDate: async (parent, { date }) => {
			try {
				if (!date) {
					throw new Error('date object is undefined');
				}
				const unavailableDate = await UnavailableDate.findOneAndDelete({ dateValue: date });
				if (!unavailableDate) {
					throw new Error('could not find unavailable date with that value...');
				}
				console.log('successfully removed unavailableDate...');

				return unavailableDate;
			} catch (err) {
				return [{ message: 'Something went wrong creating a new unavailable date...', details: err.message }];
			}
		},
	},
};

module.exports = resolvers;
