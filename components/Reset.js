import gql from 'graphql-tag';
import { useMutation } from '@apollo/client';

import DisplayError from './ErrorMessage';
import FormStyles from './styles/FormStyles';
import useForm from '../lib/useForm';

const RESET_MUTATION = gql`
  mutation RESET_MUTATION(
    $email: String!
    $password: String!
    $token: String!
  ) {
    redeemUserPasswordResetToken(
      email: $email
      token: $token
      password: $password
    ) {
      code
      message
    }
  }
`;

export default function Reset() {
  const { inputs, handleChange, resetForm } = useForm({
    email: '',
    password: '',
    token: '',
  });

  const [reset, { data, loading, error }] = useMutation(RESET_MUTATION, {
    variables: inputs,
  });

  const successfulError = data?.redeemUserPasswordResetToken.code
    ? data?.redeemUserPasswordResetToken
    : undefined;

  async function handleSubmit(e) {
    e.preventDefault();
    await reset().catch(console.error);
    resetForm();
  }

  return (
    <FormStyles method="POST" onSubmit={handleSubmit}>
      <h2>Request a Password Reset</h2>
      <DisplayError error={error || successfulError} />
      <fieldset>
        {data?.redeemUserPasswordResetToken === null && (
          <p>Success! Your password has been reset!</p>
        )}
        <label htmlFor="email">
          Email
          <input
            type="email"
            name="email"
            placeholder="Your email"
            autoComplete="email"
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
            autoComplete="password"
            value={inputs.password}
            onChange={handleChange}
          />
        </label>
        <button type="submit">Reset password!</button>
      </fieldset>
    </FormStyles>
  );
}
