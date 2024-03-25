import { FC } from "react";
import Box from "../../containers/Box";
import EGLD from "../../Icons/EGLD";
import H3 from "../../fields/H3";
import { getWalletService } from "../../../setup";
import { useRouter } from "next/router";
import BuyButton from "../../fields/BuyButton";
import NftModalOffer from "./ModalOffer";
import { ClockIcon } from "@heroicons/react/outline";

export type NftPriceProps = {
  saleEnds: string;
  amount: number;
  amountInUSD: number;
};

const NftPrice: FC<NftPriceProps> = ({ saleEnds, amount, amountInUSD }) => {
  const router = useRouter();

  // Attach wallet from Wallet service.
  let wlt = getWalletService();

  return (
    <Box className="flex-col mb-5">
      <Box className="text-gray-400 mb-5 md:text-xl items-center">
        <ClockIcon className="h-6 w-6 mr-2" />
        {saleEnds}
      </Box>
      <H3 className="text-sky-500 text-lg">{"Current Price"}</H3>
      <Box className="flex-col bg-gray-900 shadow-md rounded-lg p-5">
        <Box className="flex-row items-end text-xl mb-5">
          <Box className="flex-row items-center font-bold text-4xl">
            <EGLD className="h-8 w-8 mr-2" />
            {amount != null ? amount : "-"}
          </Box>
          <span className="text-gray-400 text-sm ml-2 mb-1">
            $ {amountInUSD}
          </span>
        </Box>
        <Box className="flex-wrap items-start xl:w-8/12">
          {/* Sign, or redirect to sign in based on auth state */}
          <BuyButton
            {...(wlt.isLoggedIn() === true
              ? {
                  onClick: () => {},
                }
              : {
                  // If not logged in, just redirect to wallet (login page).
                  onClick: () => {
                    router.push("/wallet");
                  },
                })}
            className="btn_solid mr-5 mb-5 md:mb-0"
          >
            {"Buy Now"}
          </BuyButton>
          <NftModalOffer />
        </Box>
      </Box>
    </Box>
  );
};

export default NftPrice;
