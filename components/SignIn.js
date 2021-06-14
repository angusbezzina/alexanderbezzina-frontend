import gql from "graphql-tag";
import { useMutation } from "@apollo/client";
import Link from "next/link";
import { useRouter } from "next/router";

import DisplayError from "./ErrorMessage";
import FormStyles from "./styles/FormStyles";
import useForm from "../lib/useForm";
import { CURRENT_USER_QUERY } from "./User";

import { IncognitoButtonStyles } from "./styles/ButtonStyles";

const SIGNIN_MUTATION = gql`
  mutation SIGNIN_MUTATION($email: String!, $password: String!) {
    authenticateUserWithPassword(email: $email, password: $password) {
      ... on UserAuthenticationWithPasswordSuccess {
        item {
          id
          email
          name
        }
      }

      ... on UserAuthenticationWithPasswordFailure {
        code
        message
      }
    }
  }
`;

export default function SignIn() {
  const { inputs, handleChange, resetForm } = useForm({
    email: "",
    password: "",
  });

  const [signin, { data, loading }] = useMutation(SIGNIN_MUTATION, {
    variables: inputs,
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });

  const router = useRouter();

  async function handleSubmit(e) {
    e.preventDefault();
    await signin();
    resetForm();
    router.push("/products");
  }

  const error =
    data?.authenticateUserWithPassword.__typename ===
    "UserAuthenticationWithPasswordFailure"
      ? data?.authenticateUserWithPassword
      : undefined;

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Sign In to Access the Store</h2>
      <DisplayError error={error} />
      <fieldset>
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="Password"
            value={inputs.email}
            onChange={handleChange}
          />
        </label>
        <label htmlFor="password">
          Password
          <input
            type="password"
            name="password"
            placeholder="Your password"
            autoComplete="email"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Sign In!</button>
        <Link passHref href="/forgot-password">
          <IncognitoButtonStyles display="inline-block">
            🤦... I forgot my password
          </IncognitoButtonStyles>
        </Link>
      </fieldset>
    </FormStyles>
  );
}
