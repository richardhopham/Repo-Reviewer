import { gql } from 'apollo-boost';

export const GET_REPOSITORIES = gql`
  query {
    repositories, {
      edges, {
        node, {
          id,
          name,
          ownerName,
          createdAt,
          fullName,
          reviewCount,
          ratingAverage,
          forksCount,
          stargazersCount,
          description,
          language,
          ownerAvatarUrl
        }
      }
    }
  }
`;

export const GET_LOGGED_IN = gql`
  query {
    authorizedUser {
      id
      username
    }
  }
`;

export const GET_SINGLE_REPO = gql`
  query getSingleRepo($id: ID!) {
    repository(id: $id) {
      id,
      name,
      ownerName,
      createdAt,
      fullName,
      reviewCount,
      ratingAverage,
      forksCount,
      stargazersCount,
      description,
      language,
      ownerAvatarUrl,
      url,
    }
  }
`;

export const GET_REVIEWS = gql`
  query getReviews($id: ID!) {
    repository(id: $id) {
      id
      fullName
      reviews {
        edges {
          node {
            id,
            text,
            rating,
            createdAt,
            user {
              id,
              username,
            }
          }
        }
      }
    }
  }
`;
