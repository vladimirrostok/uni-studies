import { FC } from "react";
import Image from "next/image";
import Box from "../../containers/Box";
import LaunchpadBannerData from "./data.json";

import LaunchpadHeadline from "./Headline";
import LaunchpadMint from "../launchpad/Mint";

const LaunchpadBanner: FC = ({}) => {
  const pageData = LaunchpadBannerData["data"]["attributes"];

  return (
    <Box className="collection_banner flex-col overflow-hidden relative">
      <Box className="flex-col absolute">
        <Image
          src={pageData.banner}
          alt={pageData.name}
          width="2000"
          height="2000"
          className="h-full w-full object-cover"
        />
      </Box>
      <Box className="flex-col justify-center relative z-10 h-full p-10 min-h-[calc(100vh_-_120px)]">
        <Box className="bg-black absolute inset-0 opacity-60 z-10"></Box>
        <Box className="flex-col md:flex-row items-center">
          <LaunchpadHeadline />
          <LaunchpadMint />
        </Box>
      </Box>
    </Box>
  );
};

export default LaunchpadBanner;
