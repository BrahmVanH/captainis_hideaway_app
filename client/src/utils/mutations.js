import { gql } from '@apollo/client';

export const CREATE_UNAVAILABLE_DATE = gql`
	mutation createUnavailableDate($date: String!) {
		createUnavailableDate(date: $date) {
			dateValue
		}
	}
`;
export const REMOVE_UNAVAILABLE_DATE = gql`
	mutation removeUnavailableDate($date: String!) {
		removeUnavailableDate(date: $date) {
			_id
			dateValue
		}
	}
`;
