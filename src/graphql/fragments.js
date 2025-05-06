import { gql } from '@apollo/client';

export const RepositoryDetails = gql`
  fragment RepositoryDetails on Repository {
    ownerAvatarUrl
    fullName
    description
    language
    stargazersCount
    forksCount
    reviewCount
    ratingAverage
    id
  }
`;