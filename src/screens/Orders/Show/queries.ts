import { gql } from "@apollo/client";

export const ORDER_QUERY = gql`
  query Order($number: String!) {
    getOneOrder(number: $number) {
      number
      status
      id
      delivery {
        code
      }
      items {
        id
        status
        offer {
          displayName
          externalId
        }
      }
    }
  }
`;
