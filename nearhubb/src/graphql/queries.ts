// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_SALONS = gql`
  query GetSalons {
    salons {
      nodes {
        title
        slug
        salonFields {
          city
          serviceType
          address
          phoneNumber
          whatsappNumber
        }
      }
    }
  }
`;
