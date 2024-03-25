import { FC } from "react";

import Image from "next/image";

import Box from "../../containers/Box";
import H1 from "../../fields/H1";
import Description from "../../fields/Description";
import Author from "./Author";

import CollectionBannerData from "./data.json";
import CollectionAvatar from "./Avatar";
import CollectionVolume from "./Volume";

const CollectionBanner: FC = ({}) => {
  const pageData = CollectionBannerData["data"]["attributes"];

  return (
    <Box className="collection_banner flex-col overflow-hidden">
      <Box className="max-h-48 md:max-h-full flex-col">
        <Image
          src={pageData.banner}
          alt={pageData.name}
          width="200"
          height="200"
          className="h-full w-full object-cover"
        />
      </Box>
      <Box className="flex-col -mt-16 items-center justify-center">
        <CollectionAvatar />
        <H1 className="collection_name justify-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
          {pageData.name}
        </H1>
        <Box className="collection_author justify-center -mt-5 mb-5">
          <Author author={"Gokai Labs"} />
        </Box>
        <CollectionVolume />
        <Description className="font-extrabold collection_description px-5 text-center">
          {pageData.description}
        </Description>
        {/* <CollectionMint /> */}
      </Box>
    </Box>
  );
};

export default CollectionBanner;
