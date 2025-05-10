import { gql } from "@apollo/client";
import { RepositoryDetails } from "./fragments";

export const GET_REPOSITORIES = gql`
  query Repositories(
    $orderBy: AllRepositoriesOrderBy
    $orderDirection: OrderDirection
    $searchKeyword: String
  ) {
    repositories(
      orderBy: $orderBy
      orderDirection: $orderDirection
      searchKeyword: $searchKeyword
    ) {
      edges {
        node {
          ...RepositoryDetails
        }
      }
    }
  }
  ${RepositoryDetails}
`;

export const GET_REPOSITORY = gql`
  query Repository($repositoryId: ID!) {
    repository(id: $repositoryId) {
      ...RepositoryDetails
      url
      reviews {
        edges {
          node {
            id
            text
            rating
            createdAt
            user {
              id
              username
            }
          }
        }
      }
    }
  }
  ${RepositoryDetails}
`;

export const ME = gql`
  query getCurrentUser($includeReviews: Boolean = false) {
    me {
      id
      username
      reviews @include(if: $includeReviews) {
        edges {
          node {
            id
            rating
            text
            createdAt
            repositoryId
            repository {
              fullName
            }
            user {
              id
              username
            }
          }
        }
      }
    }
  }
`;

// const GET_CURRENT_USER = gql`
//   query getCurrentUser($includeReviews: Boolean = false) {
//     me {
//       # user fields...
//       reviews @include(if: $includeReviews) {
//         edges {
//           node {
//             # review fields...
//           }
//         }
//       }
//     }
//   }
// `;
