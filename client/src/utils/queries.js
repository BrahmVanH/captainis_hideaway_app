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

export const GET_HOME_PG_IMGS = gql`
	query GetHomePgImgs {
		getHomePgImgs {
			headerImgUrl
			hideawayImgUrl
			cottageImgUrl
		}
	}
`;

export const GET_HIDEAWAY_IMAGES = gql`
	query GetHideawayImgs {
		getHideawayImgs {
			headerUrl
			galleryArray {
				original
				thumbnail
				originalAlt
				thumbnailAlt
			}
		}
	}
`;

export const GET_COTTAGE_IMAGES = gql`
	query GetCottageImgs {
		getCottageImgs {
			headerUrl
			galleryArray {
				original
				thumbnail
				originalAlt
				thumbnailAlt
			}
		}
	}
`;

export const GET_ABOUT_PG_IMAGES = gql`
	query Query {
		getAboutPgImg
	}
`;
