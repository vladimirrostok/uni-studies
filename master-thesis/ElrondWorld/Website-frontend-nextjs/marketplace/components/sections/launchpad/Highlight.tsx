import { FC } from "react";

import Image from "next/image";
import Box from "../../containers/Box";
import H1 from "../../fields/H1";
import Hyperlink from "../../fields/Hyperlink";
import Author from "../collection/Author";
import LaunchpadHighlightData from "./data.json";
import H2 from "../../fields/H2";

const LaunchpadHighlight: FC = ({}) => {
  const pageData = LaunchpadHighlightData["data"]["attributes"];

  return (
    <Box className="collection_banner flex-col overflow-hidden h-96 relative">
      <Box className="max-h-48 md:max-h-full flex-col absolute">
        <Image
          src={pageData.banner}
          alt={pageData.name}
          width="2000"
          height="500"
          className="h-full w-full object-cover"
        />
      </Box>
      <Box className="font-feature items-center justify-center relative h-full">
        <div className="flex flex-col box-content py-12 bg-black border-2 rounded-full relative">
          <H2 className="flex flex-col">Tue, Feb 08</H2>
          <H1 className=" bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 collection_name justify-center sm:text-5xl -mt-5">
            {pageData.collectionName}
          </H1>
          <Box className="collection_author justify-center -mt-5 mb-5">
            <Author author={"Gokai Labs"} />
          </Box>
          <Hyperlink href="/launchpad" className="btn_outline mx-20">
            {"View drop"}
          </Hyperlink>
        </div>
      </Box>
    </Box>
  );
};

export default LaunchpadHighlight;
