import {
  EllipsisLoader,
  IWalletService,
  trimHash,
} from "@superciety/pwa-core-library";
import { useState } from "react";
import _LedgerDevice from "./_LedgerDevice";
import Description from "../../../../fields/Description";
import H2 from "../../../../fields/H2";
import Box from "../../../../containers/Box";

type Props = {
  proofableToken: string;
  wallet: IWalletService;
};

export const _HardwareConnector = (props: Props) => {
  const [activeErrorText, setActiveErrorText] = useState<string | null>(null);
  const [isSelectingAccount, setIsSelectingAccount] = useState(false);
  const [availableAccounts, setAvailableAccounts] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState(false);

  const handleAccountSelectionRequest = async () => {
    try {
      setIsLoading(true);
      const available = await props.wallet.getHardwareAccounts();
      setIsLoading(false);
      setIsSelectingAccount(true);
      setAvailableAccounts(available);
    } catch (e) {
      setIsLoading(false);
      setActiveErrorText("Check if Elrond app is open on Ledger");
    }
  };

  const handleLoginRequest = async (addressIndex: number) => {
    try {
      setIsLoading(true);
      await props.wallet.login(props.proofableToken);
      setIsLoading(false);
      setIsSelectingAccount(false);
      setAvailableAccounts([]);
    } catch (e) {
      setIsLoading(false);
      setActiveErrorText("Check if Elrond app is open on Ledger");
    }
  };

  return isSelectingAccount && availableAccounts ? (
    <div>
      <div className="flex justify-between mb-2">
        {isLoading ? (
          <span className="highlight text-xl font-head">Check your device</span>
        ) : (
          <h2 className="text-xl text-gray-800">Your top 10 wallets</h2>
        )}
        {isLoading && <EllipsisLoader className="w-12" />}
      </div>
      <ul>
        {availableAccounts.map((address, index) => (
          <li key={address}>
            <button onClick={() => handleLoginRequest(index)} className="">
              <span className="font-head text-gray-800">
                {index + 1 + ". "}
              </span>
              <span>{trimHash(address, 20)}</span>
            </button>
          </li>
        ))}
      </ul>
    </div>
  ) : (
    <Box className="flex-col items-center">
      <div className="relative flex justify-center mb-4">
        <_LedgerDevice />
        {isLoading && (
          <EllipsisLoader className="w-20 absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2" />
        )}
      </div>
      <H2 className="text-transparent bg-clip-text bg-gradient-to-br from-sky-500 to-fuchsia-500">
        Ledger Login
      </H2>
      <Description className="-mt-5">
        Unlock your device &{" "}
        <span className="highlight">open the Elrond App</span>.
      </Description>
      <button
        onClick={handleAccountSelectionRequest}
        className="btn btn_outline group"
      >
        <span className="group-hover:bg-opacity-0">Connect to Ledger</span>
      </button>
      {activeErrorText && (
        <span className="block text-red-500 my-4">{activeErrorText}</span>
      )}
    </Box>
  );
};
