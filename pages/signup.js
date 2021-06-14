import {
  AccountStyles,
  AccountInnerStyles,
} from "../components/styles/AccountStyles";

import SignUp from "../components/SignUp";

export default function SignUpPage() {
  return (
    <AccountStyles>
      <AccountInnerStyles>
        <SignUp />
      </AccountInnerStyles>
    </AccountStyles>
  );
}
