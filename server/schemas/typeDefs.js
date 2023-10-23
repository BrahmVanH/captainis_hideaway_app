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
		getUser(userId: ID!): [User]
		queryUnavailableDates: [Date]
	}
	type Mutation {
		loginUser(username: String!, password: String!): Auth
		logoutUser(username: String!, password: String!): Auth
		createUnavailableDate(date: String): Date
		removeUnavailableDate(date: String): Date
	}
`;

module.exports = typeDefs;
