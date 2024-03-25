import { FC } from "react";
import Box from "../../containers/Box";

export interface RarityValueBoxProps {
  nftPropertyName: string;
  nftPropertyValue: string;
  nftRarity : number;
};

const RarityValueBox: FC<RarityValueBoxProps> = ({ nftPropertyName, nftPropertyValue, nftRarity }) => {
  return (
    <Box className="w-1/2 sm:w-1/3 md:w-1/4 lg:w-1/4">
      <Box className="flex-col w-full mx-1 mb-2 text-sm bg-gray-900 shadow-md rounded-lg p-4 overflow-hidden">
        <p className="font-bold text-lg text-ellipsis overflow-hidden text-sky-500">
          {nftPropertyName}
        </p>
        <p className="mt-2 text-violet-200">{nftPropertyValue}</p>
        <p className="text-fuchsia-400 whitespace-nowrap">{nftRarity}% rarity</p>
      </Box>
    </Box>
  );
};

export default RarityValueBox;
