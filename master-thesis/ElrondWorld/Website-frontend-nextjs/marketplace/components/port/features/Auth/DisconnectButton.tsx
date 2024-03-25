import React, { FC } from "react";
import { CN } from "../../../../utils/types";
import { LogoutIcon } from "@heroicons/react/outline";

interface DisconnectButtonProps extends CN {
  onClick: () => void;
}

const DisconnectButton: FC<DisconnectButtonProps> = ({ onClick, children }) => {
  return (
    <>
      <button onClick={onClick} className="btn group btn_cancel">
        <span className="group-hover:bg-opacity-0">
          <LogoutIcon className="h-6 w-6 mr-4 -ml-4" />
          {children}
        </span>
      </button>
    </>
  );
};

export default DisconnectButton;
