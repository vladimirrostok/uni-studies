import { FC } from "react";
import Box from "../../containers/Box";
import CollectionVolumeData from "./data.json";
import EGLD from "../../Icons/EGLD";

const CollectionVolume: FC = ({}) => {
  const pageData = CollectionVolumeData["data"]["attributes"];

  return (
    <Box className="collection_volume flex-wrap items-center text-center sm:text-xl bg-gray-900 shadow-md rounded-lg p-5 mb-5">
      <Box className="flex-col w-1/3 mb-2 sm:mb-0 sm:w-auto sm:mx-4">
        <Box className="items-center mx-auto">
          <EGLD className="w-5 h-5 mr-2" /> {pageData.floorPrice}
        </Box>
        <span className="font-bold text-sm whitespace-no-wrap">{"Floor"}</span>
      </Box>
      <Box className="flex-col w-1/3 mb-2 sm:mb-0 sm:w-auto sm:mx-4">
        <span>{pageData.owners}</span>
        <span className="font-bold text-sm whitespace-no-wrap">{"Owners"}</span>
      </Box>
      <Box className="flex-col w-1/3 mb-2 sm:mb-0 sm:w-auto sm:mx-4">
        <Box className="items-center mx-auto">
          <EGLD className="w-5 h-5 mr-2" /> {pageData.highestSale}
        </Box>
        <span className="font-bold text-sm whitespace-no-wrap">
          {"Highest"}
        </span>
      </Box>
      <Box className="flex-col w-1/3 mb-2 sm:mb-0 sm:w-auto sm:mx-4">
        <Box className="items-center mx-auto">
          <EGLD className="w-5 h-5 mr-2" /> {pageData.marketCap}
        </Box>
        <span className="font-bold text-sm whitespace-no-wrap">{"Market"}</span>
      </Box>
      <Box className="flex-col w-1/3 mb-2 sm:mb-0 sm:w-auto sm:mx-4">
        <span>{pageData.maxSupply}</span>
        <span className="font-bold text-sm whitespace-no-wrap">{"Items"}</span>
      </Box>
      <Box className="flex-col w-1/3 mb-2 sm:mb-0 sm:w-auto sm:mx-4">
        <Box className="items-center mx-auto">
          <EGLD className="w-5 h-5 mr-2" />
          {pageData.volumeTraded}
        </Box>
        <span className="font-bold text-sm whitespace-no-wrap">{"Volume"}</span>
      </Box>
    </Box>
  );
};

export default CollectionVolume;
