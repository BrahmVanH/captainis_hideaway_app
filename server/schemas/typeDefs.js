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

	type homePgImgPack {
		headerImgUrl: String
		hideawayImgUrl: String
		cottageImgUrl: String
	}

	type hideawayImgPack {
		headerUrl: String
		galleryArray: [imageObject]
	}

	type cottageImgPack {
		cottageHeaderUrl: String
		galleryArray: [imageObject]
	}

	type Query {
		getAllUsers: [User]
		queryUnavailableDatesByProperty(propertyName: String!): [Date]
		queryS3ByObjectType(objectType: String!): String
		getHomePgImgs: homePgImgPack
		getHideawayImgs: hideawayImgPack
		getCottageImgs: cottageImgPack
		getAboutPgImg: String
	}
	type Mutation {
		createUser(firstName: String!, lastName: String!, username: String!, userPassword: String!, adminCode: String!): Auth
		loginUser(username: String!, userPassword: String!): Auth
		createUnavailableDate(propertyName: String!, dateValue: String!): Date
		removeUnavailableDate(propertyName: String!, dateValue: String!): Date
	}
`;

module.exports = typeDefs;
