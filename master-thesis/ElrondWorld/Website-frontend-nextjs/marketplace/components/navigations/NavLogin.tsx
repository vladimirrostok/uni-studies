import { FC, useEffect, useState } from "react";
import { LightningBoltIcon } from "@heroicons/react/solid";
import Description from "../fields/Description";
import H2 from "../fields/H2";
import {
  AppSystemColor,
  IWalletService,
  ProofableLogin,
  WalletProviderId,
  WalletServiceConfig,
} from "@superciety/pwa-core-library";
import { _ProviderSelector } from "../port/features/Auth/_ProviderSelector";
import { getWalletService, WalletConfig } from "../../setup";
import { _ProviderConnector } from "../port/features/Auth/_ProviderConnector";
import { CN } from "../../utils/types";
import DisconnectButton from "../port/features/Auth/DisconnectButton";
import ProfileWallet from "../sections/profile/Wallet";
import axios from "axios";
import { useAuth } from "../../context/AuthContext";

const RequestFakeToken = () => Promise.resolve("sometoken");

const login_base_url = process.env.NEXT_PUBLIC_BACKEND_API_URL;

type Props = {
  onLoginRequest: (provider: WalletProviderId) => void;
  walletConfig: WalletServiceConfig;
  walletService: IWalletService;
  onTokenRequest: () => Promise<string>;
  onLocalLogin: (proofable: ProofableLogin) => void;
  forceOpen?: boolean;
  children?: any;
  color?: AppSystemColor;
  large?: boolean;
  disabledProviders?: WalletProviderId[];
};

let wlt = getWalletService();

let props: Props = {
  onLocalLogin(proofable: ProofableLogin): void {},
  onLoginRequest(provider: WalletProviderId): void {}, //
  walletConfig: WalletConfig,
  forceOpen: true,
  walletService: getWalletService(),
  onTokenRequest: RequestFakeToken,
};

interface NavLoginProps extends CN {
  toggleSidebar(): void;
}

const NavLogin: FC<NavLoginProps> = ({ toggleSidebar }) => {
  const { login } = useAuth();
  const [isLoggedIn, setIsLoggedIn] = useState(false);

  props.onLocalLogin = () => {
    toggleSidebar();

    if (isLoggedIn === true) {
      // SEND REQUEST TO BACKEND, NOTIFY IT OF NEW USER CREATED
      const url = login_base_url + "/auth";
      let data = { profile_wallet_address: wlt.getAddress() };

      // Set up instance to avoid CORS issue.
      // TODO - Configure CORS in a good way.
      const instance = axios.create({
        baseURL: login_base_url,
        withCredentials: false,
      });
      instance
        .post(url, data)
        .then(function (response) {
          console.log("Logged in, session approved!:");

          login(
            response.data.profile_image_file,
            response.data.profile_image_file
          );
        })
        .catch(function (error) {
          console.log("Session failed!");
        });

      // TODO: Find way to run it in background, we also need to refresh page or parts of page instead.
      // Refresh page, so that wallet related pages get all data on render.
      // window.location.reload();
    }
  };

  const [isOpen, setIsOpen] = useState(props.forceOpen || false);
  const [proofableToken, setProofableToken] = useState<string | null>(null);
  const [activeConnector, setActiveConnector] =
    useState<WalletProviderId | null>(null);

  useEffect(() => {
    if (!isOpen) return;
    init();
  }, [isOpen]);

  const init = async () => setProofableToken(await props.onTokenRequest());

  const handleLoginRequest = async (provider: WalletProviderId) => {
    await props.walletService.init(props.walletConfig, provider);
    props.walletService.onLogin = (proof) => props.onLocalLogin(proof);

    if (provider === "maiar_app") setActiveConnector(provider);
    if (provider === "maiar_extension") await handleLogin();
    if (provider === "hardware") setActiveConnector(provider);
    if (provider === "web") handleLogin();
  };

  const handleLogin = async () => {
    if (!proofableToken) return;
    await props.walletService.login(proofableToken);
    setIsOpen(false);
    setActiveConnector(null);

    // HOTFIX
    // solve bug with clicked and not logged in DeFi wallet, marking isLoggedIn to true, when there is auth address set.
    let usrSessionInLocalStorageHotFix = null;

    try {
      usrSessionInLocalStorageHotFix = JSON.parse(
        window.localStorage.getItem("wallet_user")
      );

      if (usrSessionInLocalStorageHotFix.address != undefined) {
        setIsLoggedIn(true);
      }
    } catch (e) {
      console.log("error TODO hotfix");
    }
  };

  return (
    <>
      {isLoggedIn === true ? (
        <>
          <ProfileWallet />
          <p className="text-center">
            <DisconnectButton
              onClick={() => {
                wlt.logout().then((r) => toggleSidebar());
              }}
            >
              {"Logout"}
            </DisconnectButton>
          </p>
        </>
      ) : (
        <>
          <div className="py-0 sm:pt-0 sm:mx-auto">
            <H2 className="text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
              <LightningBoltIcon className="h-6 w-6 text-sky-400 mr-5 sm:mr-0 sm:hidden" />
              <span className="text-center sm:mx-auto sm:mt-0 sm:ml-0 sm:text-3xl md:text-4xl">
                {"Wallet Connect"}
              </span>
            </H2>
            <Description className="-mt-5 mb-5 sm:mt-0 sm:hidden">
              {
                "Connect using a compatible Elrond Network wallet, or create a new one using the invite link or QR code below."
              }
            </Description>
          </div>
          {!!activeConnector && proofableToken ? (
            <_ProviderConnector
              provider={activeConnector}
              wallet={props.walletService}
              proofableToken={proofableToken}
              onCloseRequest={() => setActiveConnector(null)}
            />
          ) : (
            <_ProviderSelector onLoginRequest={handleLoginRequest} />
          )}
        </>
      )}
    </>
  );
};

export default NavLogin;
