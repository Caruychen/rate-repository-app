import { gql } from '@apollo/client';
import { REPOSITORY_FIELDS } from './fragments';

export const GET_REPOSITORIES = gql`
${REPOSITORY_FIELDS}
query {
  repositories {
    edges {
      cursor,
      node {
        ...RepositoryFields
      }
    }
  }
}`;

export const GET_REPOSITORY = gql`
${REPOSITORY_FIELDS}
query Repository($id: ID!) {
  repository(id: $id) {
    ...RepositoryFields
    url
  }
}
`;

export const GET_AUTHORIZED_USER = gql`
query {
  authorizedUser {
    id,
    username
  }
}`;