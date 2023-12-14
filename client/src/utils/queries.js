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

export const GET_HIDEAWAY_IMAGES = gql`
	query GetHideawayImages {
		getHideawayImages {
			hideawayHeaderUrl
			galleryArray {
				original
				thumbnail
				originalAlt
				thumbnailAlt
			}
		}
	}
`;

export const GET_APOLLO_ERRORS = gql`
	query getApolloErrors {
		getApolloErrors {
			error
		}
	}
`;
