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
		dateValue: String!
	}

	type Query {
		getAllUsers: [User]
		queryUnavailableDates: [Date]
	}
	type Mutation {
		createUser(firstName: String!, lastName: String!, username: String!, userPassword: String!): Auth
		loginUser(username: String!, userPassword: String!): Auth
		createUnavailableDate(date: String): Date
		removeUnavailableDate(date: String): Date
	}
`;

module.exports = typeDefs;
