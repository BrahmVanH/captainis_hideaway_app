import { gql } from '@apollo/client';

export const QUERY_UNAVAILABLE_DATES = gql`
  query queryUnavailableDates($propertyName: String) {
    queryUnavailableDates(propertyName: $propertyName) {
      _id
      dateValue
      propertyName
    }
  }
`