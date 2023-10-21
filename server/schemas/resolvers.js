const { AuthenticationError } = require('apollo-server-express');

const resolvers = {
	Query: {
		queryUnavailableDates: async () => {
			try {
				const dates = await UnavailableDates.find({});
				if (!dates) {
					throw new Error("Cannot find all dates in database");
				} return dates;
			} catch (err) {
				return [{ message: "Error in queryUnavailableDates...", details: err.message }]
			}
		}
	},
	Mutation: {
		createUnavailableDate: async (parent, {date}) => {
			try {
				if (!date) {
					throw new Error("date object is undefined");
				}
				const unavailableDate = await UnavailableDates.create({dateValue: date});
				
				if (!unavailableDate) {
					throw new Error("Could not create new date");
				}
				return unavailableDate;
			} catch (err) {
				return [{message: "Something went wrong creating a new unavailable date..."}]
			}
		}
	},
};

module.exports = resolvers;
