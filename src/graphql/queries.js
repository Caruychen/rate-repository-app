import { gql } from '@apollo/client';

export const GET_REPOSITORIES = gql`
query {
  repositories {
    edges {
      cursor,
      node {
        id,
        ownerName,
        name,
        createdAt,
        fullName,
        description,
        language,
        ownerAvatarUrl,
        reviewCount,
        ratingAverage,
        stargazersCount,
        forksCount
      }
    }
  }
}`;