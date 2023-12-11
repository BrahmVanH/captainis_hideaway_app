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
	query queryUnavailableDatesByProperty($propertyName: String!) {
		queryUnavailableDatesByProperty(propertyName: $propertyName) {
			_id
			dateValue
			propertyName
		}
	}
`;

export const QUERY_S3_OBJECTS = gql`

	query queryS3ByObjectType($objectType: String!) {
		queryS3ByObjectType(objectType: $objectType) {
			
		}
	}
`
