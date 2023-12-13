const { Schema, model } = require('mongoose');

const exception = new Schema({
	stacktrace: {
		type: [String],
	},
});
const extensions = new Schema({
	code: {
		type: String,
	},
	exception: exception,
});
const graphQlErrors = new Schema({
	message: {
		type: String,
	},
	extensions: extensions,
});
const apolloErrorSchema = new Schema({
	name: {
		type: String,
	},

	networkResponseUrl: {
		type: String,
	},
	errorMessage: {
		type: String,
	},
	networkErrorName: {
		type: String,
	},
	graphQlErrors: [graphQlErrors],
	networkErrorStatus: {
		type: Number,
	},
	stack: {
		type: String,
	},
});

const ApolloError = model('ApolloError', apolloErrorSchema);

module.exports = ApolloError;
