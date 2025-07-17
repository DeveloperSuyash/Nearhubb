// src/graphql/queries.ts
import { gql } from '@apollo/client';

export const GET_SALONS = gql`
 query GetSalonBySlug($slug: ID!) {
  salon(id: $slug, idType: SLUG) {
    title
    featuredImage {
      node {
        sourceUrl
      }
    }
    salonFields {
      shopName
      reviewSnippet
      address
      phoneNumber
      openingHours {
        day
        time
      }
      appointmentUrl
      salonPhoto {
        sourceUrl
      }
      servicePhoto {
        sourceUrl
      }
      businessUsp
      otherLocations {
        name
        address
        mapLink
      }
      amenities
      aboutBusiness
      faqs {
        question
        answer
      }
      reviewBody {
        name
        review
        rating
      }
      relatedSalons {
        ... on Salon {
          title
          slug
        }
      }
    }
  }
}

`;
