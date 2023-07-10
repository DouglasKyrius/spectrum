import { gql } from '@apollo/client';

export const CREATE_USER = gql`
  mutation signUpUser($input: SignUpInput!) {
    signUp(signUpInput: $input) {
      access_token
    }
  }
`;
