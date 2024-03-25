import { FC } from "react";
import Box from "../../containers/Box";
import H3 from "../../fields/H3";

export interface NftDetailsProps {
  ownedBy: string;
  mintedBy: string;
  token: string;
  royalties: number;
}

const NftDetails: FC<NftDetailsProps> = ({
  mintedBy,
  ownedBy,
  token,
  royalties,
}) => {
  return (
    <Box className="flex-col mb-5 bg-gray-900 shadow-md rounded-lg p-5">
      <H3 className="font-bold text-ellipsis overflow-hidden text-sky-500 text-lg">
        {"Details"}
      </H3>
      <Box className="flex-row mb-4">
        <p className="text-violet-200 mr-auto">Minted by</p>
        <p className="font-bold text-violet-200 whitespace-nowrap">
          {mintedBy}
        </p>
      </Box>
      <Box className="flex-row mb-4">
        <p className="text-violet-200 mr-auto">Owned by</p>
        <p className="font-bold text-violet-200 whitespace-nowrap">{ownedBy}</p>
      </Box>
      <Box className="flex-row mb-4">
        <p className="text-violet-200 mr-auto">Token</p>
        <p className="font-bold text-violet-200 whitespace-nowrap">{token}</p>
      </Box>
      <Box className="flex-row mb-4">
        <p className="text-violet-200 mr-auto">Royalties</p>
        <p className="font-bold text-violet-200 whitespace-nowrap">
          {royalties}%
        </p>
      </Box>
    </Box>
  );
};

export default NftDetails;
