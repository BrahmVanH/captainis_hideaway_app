const { gql } = require('apollo-server-express');

const typeDefs = gql`
	type User {
		_id: ID!
		firstName: String!
		lastName: String!
		username: String!
		password: String!
	}

	type Auth {
		token: ID!
		user: User
	}

	type Date {
		_id: ID!
		propertyName: String!
		dateValue: String!
	}

	type imageObject {
		original: String
		thumbnail: String
		originalAlt: String
		thumbnailAlt: String
	}

	# type ApolloError {
	# 	error: String!
	# }

	# scalar ApolloError

	type hideawayImgPack {
		hideawayHeaderUrl: String
		galleryArray: [imageObject]
	}

	type ApolloError {
		name: String
		networkResponseUrl: String
		errorMessage: String
		networkErrorName: String
		graphQLErrors: [GraphQLError]
		networkErrorStatus: Int
		stack: String
	}

	input ApolloErrorInput {
		name: String
		networkResponseUrl: String
		errorMessage: String
		networkErrorName: String
		graphQLErrors: [GraphQLErrorInput]
		networkErrorStatus: Int
		stack: String
	}

	type GraphQLError {
		message: String
		extensions: GraphQLErrorExtensions
	}
	input GraphQLErrorInput {
		message: String
		extensions: GraphQLErrorExtensionsInput
	}

	type GraphQLErrorExtensions {
		code: String
		exception: GraphQLErrorExtensionsException
	}
	input GraphQLErrorExtensionsInput {
		code: String
		exception: GraphQLErrorExtensionsExceptionInput
	}

	type GraphQLErrorExtensionsException {
		stacktrace: [String]
	}
	input GraphQLErrorExtensionsExceptionInput {
		stacktrace: [String]
	}

	type Query {
		getAllUsers: [User]
		queryUnavailableDatesByProperty(propertyName: String!): [Date]
		queryS3ByObjectType(objectType: String!): String
		getHideawayImages: hideawayImgPack
		getApolloErrors: [ApolloError]
	}
	type Mutation {
		createUser(firstName: String!, lastName: String!, username: String!, userPassword: String!, adminCode: String!): Auth
		loginUser(username: String!, userPassword: String!): Auth
		createUnavailableDate(propertyName: String!, dateValue: String!): Date
		removeUnavailableDate(propertyName: String!, dateValue: String!): Date
		logApolloError(error: ApolloErrorInput): ApolloError
	}
`;

module.exports = typeDefs;
