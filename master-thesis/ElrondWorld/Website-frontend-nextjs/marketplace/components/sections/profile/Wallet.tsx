import { FC, useEffect, useState } from "react";
import Box from "../../containers/Box";
import H2 from "../../fields/H2";
import H3 from "../../fields/H3";
import ProfileAvatar from "./Pic";
import { LightningBoltIcon } from "@heroicons/react/solid";
import EGLD from "../../Icons/EGLD";
import MEX from "../../Icons/MEX";
import { getWalletService } from "../../../setup";
import { useAuth } from "../../../context/AuthContext";
import { add } from "dom7";

const elrond_api_base_url = process.env.NEXT_PUBLIC_ELROND_API_URL;
const elrond_gateway_url = process.env.NEXT_PUBLIC_ELROND_GATEWAY_URL;
const elrond_mainnet_gateway_url =
  process.env.NEXT_PUBLIC_MAINNET_ELROND_GATEWAY_URL;

const ProfileWallet: FC = ({}) => {
  const [herotag, setHerotag] = useState<string>("");
  const [balanceEGLD, setBalanceEGLD] = useState<number>(undefined);
  const [balanceMEX, setBalanceMEX] = useState<number>(undefined);
  const [wealthUSD, setWealthUSD] = useState<number>(undefined);
  const [wealthEGLDUSD, setWealthEGLDUSD] = useState<number>(undefined);
  const [wealthMEXUSD, setWealthMEXUSD] = useState<number>(undefined);

  // Attach wallet from Wallet service.
  let wlt = getWalletService();

  // Address required to prepare request, and print address on page.
  // Also fix bug, try re-implement the isLoggedIn which checks not only key presence in localstorage
  // this is because it writes empty session by key to local storage.
  let address = null;
  let usrSessionInLocalStorageHotFix = null;

  try {
    usrSessionInLocalStorageHotFix = JSON.parse(
      window.localStorage.getItem("wallet_user")
    );

    if (usrSessionInLocalStorageHotFix.address != undefined) {
      address = wlt.getAddress();
    }
  } catch (e) {
    console.log("error TODO hotfix");
  }

  // Fetch wallet data when component mounted.q
  useEffect(() => {
    const getWalletBalanceEGLD = async () => {
      const res = await fetch(elrond_gateway_url + `/address/` + address, {
        method: "GET",
      });

      // TODO - how to handle global errors?
      if (!res.ok) {
        return console.error(await res.text());
      }

      if (res.status === 200) {
        const walletBalanceInfo = await res.json();

        // Ensure data exists in response.
        if (walletBalanceInfo.data.account.balance) {
          let egldAvailable = walletBalanceInfo.data.account.balance;

          // Clearly check for 0, 0 is valid case.
          if (egldAvailable != 0) {
            setBalanceEGLD(egldAvailable);
          }
        } else {
          setBalanceEGLD(0);
        }
      }

      if (res.status !== 200 && balanceEGLD) {
        setBalanceEGLD(undefined);
      }
    };

    const getWalletHerotag = async () => {
      const res = await fetch(
        elrond_mainnet_gateway_url + `/address/` + address,
        {
          method: "GET",
        }
      );

      // TODO - how to handle global errors?
      if (!res.ok) {
        return console.error(await res.text());
      }

      if (res.status === 200) {
        const walletBalanceInfo = await res.json();

        // Ensure data exists in response.
        if (walletBalanceInfo.data.account.username) {
          let herotag = walletBalanceInfo.data.account.username;

          // Clearly check if herotag exists and not null.
          if (herotag != "") {
            setHerotag(herotag);
          }
        } else {
          // TODO - report bug as empty herotag still exists as key in json.
          setHerotag("");
        }

        setHerotag(walletBalanceInfo.data.account.username);
      }
    };

    getWalletBalanceEGLD();
    getWalletHerotag();
  }, [address]);

  // Calculate current wallet's wealth value in USD $.
  useEffect(() => {
    const getBalanceTokensMEX = async () => {
      const resMEX = await fetch(
        elrond_api_base_url + `/accounts/` + address + `/tokens?name=MEX`,
        {
          method: "GET",
        }
      );

      // TODO - how to handle global errors?
      if (!resMEX.ok) {
        return console.error(await resMEX.text());
      }

      if (resMEX.status === 200) {
        const infoMEX = await resMEX.json();

        // Ensure data exists in response.
        if (infoMEX[0]) {
          if (infoMEX[0].balance) {
            let mexAvailable = infoMEX[0].balance;

            // Clearly check for 0, 0 is valid case.
            if (mexAvailable != 0) {
              setBalanceMEX(mexAvailable);
            }
          } else {
            setBalanceMEX(0);
          }
        } else {
          setBalanceMEX(0);
        }
      }

      // TODO - how to handle global errors?
      if (resMEX.status !== 200 && balanceMEX) {
        setBalanceMEX(0);
      }
    };

    getBalanceTokensMEX();
  }, [address]);

  // Calculate current wallet's wealth value in USD $.
  useEffect(() => {
    const getWealth = async () => {
      // Fetch only when BOTH: EGLD and MEX have fetched already as deps array below triggered on ANY change to ANY of them.
      if (balanceMEX !== undefined && balanceEGLD !== undefined) {
        const resEGLDUSD = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=elrond-erd-2&vs_currencies=USD`,
          {
            method: "GET",
          }
        );

        const resMEXUSD = await fetch(
          `https://api.coingecko.com/api/v3/simple/price?ids=maiar-dex&vs_currencies=USD`,
          {
            method: "GET",
          }
        );

        // TODO - how to handle global errors?
        if (!resEGLDUSD.ok) {
          return console.error(await resEGLDUSD.text());
        }

        // TODO - how to handle global errors?
        if (!resMEXUSD.ok) {
          return console.error(await resMEXUSD.text());
        }

        if (resEGLDUSD.status === 200 && resMEXUSD.status === 200) {
          const priceInfoEGLD = await resEGLDUSD.json();
          const priceInfoMEX = await resMEXUSD.json();

          let wealthEGLD = 0;
          let wealthMEX = 0;

          if (balanceEGLD != 0)
            wealthEGLD = priceInfoEGLD["elrond-erd-2"]["usd"] * balanceEGLD;
          if (balanceMEX != 0)
            wealthMEX = priceInfoMEX["maiar-dex"]["usd"] * balanceMEX;

          setWealthEGLDUSD(wealthEGLD);
          setWealthMEXUSD(wealthMEX);

          let totalWealth = wealthEGLD + wealthMEX;
          setWealthUSD(totalWealth);
        }

        // TODO - how to handle global errors?
        if (resEGLDUSD.status !== 200 && wealthUSD) {
          setWealthUSD(undefined);
        }

        // TODO - how to handle global errors?
        if (resMEXUSD.status !== 200 && wealthUSD) {
          setWealthUSD(undefined);
        }
      }
    };
    getWealth();
  }, [balanceEGLD, balanceMEX]);

  let addressLine =
    address.substring(0, 6) +
    "..." +
    address.substring(address.length - 6, address.length);

  let wealthUSDToShow = formatBalanceUSD(wealthUSD);
  let balanceEGLDToShow = formatBalanceCrypto(balanceEGLD);
  let wealthEGLDToShow = formatBalanceUSD(wealthEGLDUSD);
  let balanceMEXToShow = formatBalanceCrypto(balanceMEX);
  let wealthMEXToShow = formatBalanceUSD(wealthMEXUSD);

  function formatBalanceCrypto(balance) {
    if (balance === 0 || balance === null || balance === undefined) {
      return 0;
    } else {
      return Number(balance / 1000000000000000000).toFixed(4);
    }
  }

  function formatBalanceUSD(balance) {
    if (balance === 0 || balance === null || balance === undefined) {
      return 0;
    } else {
      return Number(balance / 1000000000000000000).toFixed(2);
    }
  }

  const { profileImage, profileName } = useAuth();
  return (
    <Box className="profile_wallet w-full flex-col overflow-hidden">
      <H2>
        <LightningBoltIcon className="sm:hidden h-8 w-8 text-sky-400 mr-4" />
        <span className="sm:text-4xl lg:text-5xl mx-auto text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
          {"Wallet Balance"}
        </span>
      </H2>
      <Box className="flex-row items-center mb-10 mx-5 text-lg">
        <Box className="mr-auto items-center">
          <Box className="w-14">
            {profileImage != "" ? (
              <ProfileAvatar profileImage={profileImage} />
            ) : (
              <ProfileAvatar />
            )}
          </Box>
          {herotag ? <p className="mr-auto font-bold">{herotag}</p> : <>-</>}
        </Box>
        <p className="text-lg text-gray-400">{addressLine}</p>
      </Box>
      <H3 className="mx-auto sm:text-2xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        {"Total Balance"}
      </H3>
      <Box className="mx-auto text-xl -mt-4 mb-10">
        <span className="mr-2">$</span>
        <span>{wealthUSDToShow}</span>
      </Box>
      <Box className="flex-col mb-10 mx-5">
        <Box className="text-lg items-center mb-2">
          <EGLD className="h6 w-6 m-2" />
          <span className="">EGLD</span>
          <Box className="ml-auto flex-col items-end">
            <span className="">{balanceEGLDToShow}</span>
            <span className="text-sm text-gray-400 -mt-1 pb-2">
              $ {wealthEGLDToShow}
            </span>
          </Box>
        </Box>
        <Box className="text-lg items-center mt-2 pt-4 border-t-2 border-sky-500">
          <MEX className="h6 w-6 mr-2 mx-3" />
          <span className="">MEX</span>
          <Box className="ml-auto flex-col items-end">
            <span className="">{balanceMEXToShow}</span>
            <span className="text-sm text-gray-400 -mt-2 pt-1">
              $ {wealthMEXToShow}
            </span>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default ProfileWallet;
