import { gql } from '@apollo/client';

export const QUERY_UNAVAILABLE_DATES = gql`
  query queryUnavailableDates {
    queryUnavailableDates {
      _id
      dateValue
    }
  }
`