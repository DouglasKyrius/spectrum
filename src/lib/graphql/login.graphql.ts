import { gql } from '@apollo/client';

export const LOGIN_USER = gql`
  mutation signInUser($input: SignInInput!) {
    signIn(signInInput: $input) {
      access_token
    }
  }
`;
