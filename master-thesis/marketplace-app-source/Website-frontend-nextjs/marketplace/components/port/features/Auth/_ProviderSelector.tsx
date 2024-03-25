import React from "react";
import Nav from "../../../containers/Nav";
import {
  ElrondWebWalletLogo,
  LedgerLogo,
  MaiarAppWalletLogo,
  MaiarDefiWalletLogo,
  WalletProviderId,
} from "@superciety/pwa-core-library";
import _ProviderButton from "./_ProviderButton";

const ElrondWalletSetupLinkUrl = "https://devnet-wallet.elrond.com/create";

type Props = {
  onLoginRequest: (provider: WalletProviderId) => void;
};

export const _ProviderSelector = (props: Props) => (
  <Nav className="flex-col">
    <_ProviderButton
      className="btn_outline mb-5"
      onClick={() => props.onLoginRequest("maiar_extension")}
    >
      <MaiarDefiWalletLogo white className="h-6 mr-4" />
      Maiar DeFi Wallet
    </_ProviderButton>
    <_ProviderButton
      className="btn_outline mb-5"
      onClick={() => props.onLoginRequest("maiar_app")}
    >
      <MaiarAppWalletLogo white className="w-6 h-6 mr-4" />
      Maiar App
    </_ProviderButton>
    <_ProviderButton
      className="btn_outline mb-5"
      onClick={() => props.onLoginRequest("hardware")}
    >
      <LedgerLogo white className="w-6 h-6 mr-4" />
      Ledger
    </_ProviderButton>
    <_ProviderButton
      className="btn_outline mb-5"
      onClick={() => props.onLoginRequest("web")}
    >
      <ElrondWebWalletLogo white className="w-6 h-6 mr-4" />
      Elrond Web Wallet
    </_ProviderButton>
    <p className="mt-5 text-xl text-gray-500 text-center leading-tight">
      <strong className="block">New to Elrond Blockchain?</strong>
      <a
        href={ElrondWalletSetupLinkUrl}
        target="_blank"
        className="text-base pb-2 border-b-2 hover:animate-pulse border-b-violet-500 hover:text-fuchsia-500"
        rel="noreferrer"
      >
        Learn how to setup a wallet
      </a>
    </p>
    <p className="pt-5 text-l text-gray-500 text-center leading-tight mt-5">
      Scan QR to GetMaiar App{" "}
    </p>
    <div className="flex items-center flex-shrink-0 mx-14 sm:mx-10 mt-0">
      <img
        className="py-2"
        src="/static/images/EW-Invite-Maiar-App.png"
        alt="MetaMex MarketPlace"
      />
    </div>
  </Nav>
);
