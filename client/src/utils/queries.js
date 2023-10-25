import { gql } from '@apollo/client';

export const GET_ALL_USERS = gql`
	query getAllUsers {
		getAllUsers {
			firstName
			lastName
			username
		}
	}
`;

export const QUERY_UNAVAILABLE_DATES = gql`
	query queryUnavailableDates($propertyName: String) {
		queryUnavailableDates(propertyName: $propertyName) {
			_id
			dateValue
			propertyName
		}
	}
`;
