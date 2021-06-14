import { AccountStyles, AccountInnerStyles } from '../components/styles/AccountStyles';

import RequestReset from "../components/RequestReset";

export default function ForgotPasswordPage() {
  return (
    <AccountStyles>
      <AccountInnerStyles>
        <RequestReset />
      </AccountInnerStyles>
    </AccountStyles>
  );
}
