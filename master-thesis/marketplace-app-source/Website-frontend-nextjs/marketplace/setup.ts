import {
  WalletService,
  WalletServiceConfig,
} from "@superciety/pwa-core-library";

export const WalletConfig: WalletServiceConfig = {
  ApiAddress: "https://devnet-api.elrond.com",
  WebWalletUrl: "https://devnet-wallet.elrond.com/dapp/init",
  Explorer: "https://devnet-explorer.elrond.com",
  WalletConnectBridge: "https://bridge.walletconnect.org",
  WalletConnectDeepLink:
    "https://maiar.page.link/?apn=com.elrond.maiar.wallet&isi=1519405832&ibi=com.elrond.maiar.wallet&link=https://maiar.com/",
  ChainId: "D",
};

export const getWalletService = () => {
  const wallet = WalletService.getInstance();
  wallet.init(WalletConfig);

  // Refresh page if wallet disconnected.
  wallet.onLogout = () => {
    window.location.reload();
  };

  return wallet;
};
