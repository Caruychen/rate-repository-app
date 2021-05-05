import { gql } from '@apollo/client';

export const REPOSITORY_FIELDS = gql`
fragment RepositoryFields on Repository {
  id
  ownerName
  name
  createdAt
  fullName
  description
  language
  ownerAvatarUrl
  reviewCount
  ratingAverage
  stargazersCount
  forksCount
}
`;

export const REVIEW_FIELDS = gql`
fragment ReviewFields on Review {
  id
  text
  rating
  createdAt
  user {
    id
    username
  }
}
`;