import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS, REVIEW_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
${REPOSITORY_FIELDS}
query Repositories($orderBy: AllRepositoriesOrderBy, $orderDirection: OrderDirection, $searchKeyword: String,
  $after: String, $first: Int) {
  repositories(orderBy: $orderBy, orderDirection: $orderDirection, searchKeyword: $searchKeyword,
    after: $after, first: $first) {
    edges {
      cursor,
      node {
        ...RepositoryFields
      }
    }
    pageInfo {
      hasNextPage
      endCursor
    }
  }
}`;

export const GET_REPOSITORY = gql`
${REPOSITORY_FIELDS}
${REVIEW_FIELDS}
query Repository($id: ID!, $after: String, $first: Int) {
  repository(id: $id) {
    ...RepositoryFields
    url
    reviews(after: $after, first: $first) {
      edges {
        cursor
        node {
          ...ReviewFields
        }
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
${REVIEW_FIELDS}
query AuthorizedUser($includeReviews: Boolean = false, $after: String, $first: Int) {
  authorizedUser {
    id,
    username,
    reviews(after: $after, first: $first) @include(if: $includeReviews) {
      edges {
        node {
          ...ReviewFields
        }
        cursor
      }
      pageInfo {
        hasNextPage
        endCursor
      }
    }
  }
}`;