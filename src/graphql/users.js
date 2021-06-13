import { gql } from "@apollo/client";

export const REGISTER_USER = gql`
  mutation ($username: String!, $password: String!, $email: String!) {
    register(username: $username, password: $password, email: $email) {
      id
      email
      username
      createdAt
      token
    }
  }
`;

export const LOGIN = gql`
  mutation login($email: String!, $password: String!) {
    login(email: $email, password: $password) {
      id
      email
      username
      createdAt
      token
    }
  }
`;
