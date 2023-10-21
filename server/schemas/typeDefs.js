const { gql } = require('apollo-server-express');

const typeDefs = gql`

	type Date {
		_id: ID!
		dateValue: String!
	}

	type Query {
		queryUnavailableDates: [Date]
	}
	type Mutation {
		createUnavailableDate(date: String): [Date]
	}
`;

module.exports = typeDefs;
