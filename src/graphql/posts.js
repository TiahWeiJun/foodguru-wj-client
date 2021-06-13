import { gql } from "@apollo/client";

export const CREATE_POST = gql`
  mutation createPost(
    $generalLocation: String!
    $address: String!
    $cuisine: [String!]!
    $nameOfHawkerCenter: String
    $nameOfShop: String!
    $nameOfFood: String!
    $description: String
    $imageURL: String
    $username: String!
    $isHalal: Boolean!
    $isAirCon: Boolean!
    $type: String!
    $price: Float!
  ) {
    createPost(
      generalLocation: $generalLocation
      address: $address
      cuisine: $cuisine
      nameOfHawkerCenter: $nameOfHawkerCenter
      nameOfShop: $nameOfShop
      nameOfFood: $nameOfFood
      description: $description
      imageURL: $imageURL
      username: $username
      isHalal: $isHalal
      isAirCon: $isAirCon
      type: $type
      price: $price
    ) {
      id
      generalLocation
      address
      cuisine
      nameOfHawkerCenter
      nameOfShop
      nameOfFood
      description
      imageURL
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      username
      isHalal
      isAirCon
      type
      price
      filterString
    }
  }
`;

export const GET_POSTS = gql`
  query getPosts {
    getPosts {
      id
      generalLocation
      address
      cuisine
      nameOfHawkerCenter
      nameOfShop
      nameOfFood
      description
      imageURL
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      username
      isHalal
      isAirCon
      type
      price
      filterString
    }
  }
`;

export const GET_POST = gql`
  query getPost($postID: String!) {
    getPost(postID: $postID) {
      id
      generalLocation
      address
      cuisine
      nameOfHawkerCenter
      nameOfShop
      nameOfFood
      description
      imageURL
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      username
      isHalal
      isAirCon
      type
      price
      filterString
    }
  }
`;

export const LIKE_POST = gql`
  mutation likePost($postID: String!) {
    likePost(postID: $postID) {
      id
      generalLocation
      address
      cuisine
      nameOfHawkerCenter
      nameOfShop
      nameOfFood
      description
      imageURL
      createdAt
      likes {
        id
        username
        createdAt
      }
      likeCount
      username
      isHalal
      isAirCon
      type
      price
      filterString
    }
  }
`;

export const DELETE_POST = gql`
  mutation deletePost($postID: String!) {
    deletePost(postID: $postID)
  }
`;
