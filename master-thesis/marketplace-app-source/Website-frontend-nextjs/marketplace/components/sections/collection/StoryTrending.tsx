import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "../../containers/Box";
import H3 from "../../fields/H3";
import Author from "./Author";

import CollectionStoryTrendingData from "./data.json";
import Article from "../../containers/Article";

const CollectionStoryTrending: FC = ({}) => {
  const pageData = CollectionStoryTrendingData["data"]["attributes"];

  return (
    <Link href="/collection">
      <a className="collection_story block mb-8 md:mx-4">
        <Article className="flex-col bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <Image
            src={pageData.banner}
            alt={pageData.name}
            width="250"
            height="150"
            className="max-h-1 hidden w-full object-cover"
          />
          <Box className="flex-col items-center justify-center">
            <H3 className="justify-center text-md mt-5">{pageData.name}</H3>
            <Box className="justify-center -mt-5 mb-5">
              <Author author={"Gokai Labs"} />
            </Box>
          </Box>
        </Article>
      </a>
    </Link>
  );
};

export default CollectionStoryTrending;
