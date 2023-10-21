const { AuthenticationError } = require('apollo-server-express');
const { UnavailableDate } = require('../models');

const resolvers = {
	Query: {
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
		createUnavailableDate: async (parent, { date }) => {
			try {
				if (!date) {
					throw new Error('date object is undefined');
				}
				const unavailableDate = await UnavailableDate.create({ dateValue: date });

				if (!unavailableDate) {
					throw new Error('Could not create new date');
				}
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
				return unavailableDate;
			} catch (err) {
				return [{ message: 'Something went wrong creating a new unavailable date...', details: err.message }];
			}
		},
	},
};

module.exports = resolvers;
