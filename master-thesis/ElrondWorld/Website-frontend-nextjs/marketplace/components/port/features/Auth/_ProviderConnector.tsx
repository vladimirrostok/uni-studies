import React from "react";

import { IWalletService, WalletProviderId } from "@superciety/pwa-core-library";
import { _MaiarAppConnector } from "./connectors/_MaiarAppConnector";
import { _HardwareConnector } from "./connectors/_HardwareConnector";
import { ChevronLeftIcon } from "@heroicons/react/solid";

type Props = {
  provider: WalletProviderId;
  wallet: IWalletService;
  proofableToken: string;
  onCloseRequest: () => void;
};

export const _ProviderConnector = (props: Props) => {
  const ConnectorContent = () => {
    if (props.provider === "maiar_app")
      return (
        <_MaiarAppConnector
          wallet={props.wallet}
          proofableToken={props.proofableToken}
        />
      );
    if (props.provider === "hardware")
      return (
        <_HardwareConnector
          wallet={props.wallet}
          proofableToken={props.proofableToken}
        />
      );
    return null;
  };

  return (
    <div>
      <header>
        <button
          onClick={props.onCloseRequest}
          className="flex flex-row items-center mb-5 rounded-xl text-sky-400 hover:text-sky-500 text-xl"
        >
          <ChevronLeftIcon className="h-6 w-6" />
          <span className="font-bold">Go back</span>
        </button>
      </header>
      <ConnectorContent />
    </div>
  );
};
