import Link from 'next/link';
import {
  AccountStyles,
  AccountInnerStyles,
} from "../components/styles/AccountStyles";

import SignIn from "../components/SignIn";

export default function SignInPage() {
  return (
    <AccountStyles>
      <AccountInnerStyles>
        <SignIn />
        <p>Don't have an account? <Link href="/signup">Sign up.</Link></p>
      </AccountInnerStyles>
    </AccountStyles>
  );
}
