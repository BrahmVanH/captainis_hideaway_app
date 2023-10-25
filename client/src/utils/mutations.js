import { gql } from '@apollo/client';

export const CREATE_USER = gql`
	mutation createUser($firstName: String!, $lastName: String!, $username: String!, $userPassword: String!) {
		createUser(firstName: $firstName, lastName: $lastName, username: $username, userPassword: $userPassword) {
			token
			user {
				firstName
				lastName
				username
			}
		}
	}
`;

export const LOGIN_USER = gql`
	mutation loginUser($username: String!, $password: String!) {
		loginUser(username: $username, password: $password) {
			token
			user {
				_id
				firstName
				lastName
				username
			}
		}
	}
`;

export const CREATE_UNAVAILABLE_DATE = gql`
	mutation createUnavailableDate($propertyName: String!, $dateValue: String!) {
		createUnavailableDate(propertyName: $propertyName, dateValue: $dateValue) {
			dateValue
		}
	}
`;
export const REMOVE_UNAVAILABLE_DATE = gql`
	mutation removeUnavailableDate($propertyName: String!, $dateValue: String!) {
		removeUnavailableDate(propertyName: $propertyName, dateValue: $dateValue) {
			_id
			dateValue
		}
	}
`;
