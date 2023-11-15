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

	type Query {
		getAllUsers: [User]
		queryUnavailableDatesByProperty(propertyName: String!): [Date]
		getImages: [String]
	}
	type Mutation {
		createUser(firstName: String!, lastName: String!, username: String!, userPassword: String!, adminCode: String!): Auth
		loginUser(username: String!, userPassword: String!): Auth
		createUnavailableDate(propertyName: String!, dateValue: String!): Date
		removeUnavailableDate(propertyName: String!, dateValue: String!): Date
	}
`;

module.exports = typeDefs;
