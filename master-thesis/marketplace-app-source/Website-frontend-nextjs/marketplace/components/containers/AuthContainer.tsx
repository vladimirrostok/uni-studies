import { FC } from "react";
import { useRouter } from "next/router";
import { getWalletService } from "../../setup";

interface AuthRequiredProps {
  children?: React.ReactNode;
}

const AuthRequired: FC<AuthRequiredProps> = ({ children }) => {
  const router = useRouter();
  let wlt = getWalletService();

  // TODO: set a more reliable solution with also nonce/session validity check AND return to SAME page AFTER logging in.

  if (!wlt.isLoggedIn()) {
    router.push("/wallet");
  } else {
    return <>{children}</>;
  }

  return <></>;
};
export default AuthRequired;
