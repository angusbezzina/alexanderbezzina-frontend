import { useMutation } from "@apollo/client";
import gql from "graphql-tag";
import { CURRENT_USER_QUERY } from "./User";
import { useRouter } from "next/router";

const SIGNOUT_MUTATION = gql`
  mutation {
    endSession
  }
`;

export default function SignOut({ setAccountOptionsOpen }) {
  const [signout] = useMutation(SIGNOUT_MUTATION, {
    refetchQueries: [{ query: CURRENT_USER_QUERY }],
  });
  const router = useRouter();

  return (
    <button
      type="button"
      title="Sign Out"
      onClick={() => {
        setAccountOptionsOpen(false);
        signout();
        router.push("/signin");
      }}
    >
      Sign Out
    </button>
  );
}
