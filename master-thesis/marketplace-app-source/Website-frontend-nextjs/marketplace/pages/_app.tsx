import { FC } from "react";
import { AppProps } from "next/app";
import { withPasswordProtect } from "@storyofams/next-password-protect";

import "../styles/globals.css";
import AuthProvider from "../context/AuthContext";
import { getWalletService } from "../setup";

let wlt = getWalletService();

const App: FC<AppProps> = ({ Component, pageProps }: AppProps) => {
  // HOTFIX
  // After Maiar DeFi extension used for logging in, but closed without logging in
  // then it creates wallet_user in localstorage
  // it kills rest logic as it says it's logged in but there is no address nor anything else
  // remove that value from browser when auth is broken.
  if (wlt.isLoggedIn()) {
    try {
      wlt.getAddress();
    } catch (error) {
      window.localStorage.removeItem("wallet_user");
      window.location.reload();
    }
  }

  return (
    <AuthProvider>
      <Component {...pageProps} />
    </AuthProvider>
  );
};

export default process.env.PASSWORD_PROTECT
  ? withPasswordProtect(App, {
      // Options go here (optional)
      loginApiUrl: "/api/login",
    })
  : App;
