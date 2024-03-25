import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "../../containers/Box";
import H3 from "../../fields/H3";
import Description from "../../fields/Description";
import Author from "./Author";

import CollectionStoryData from "./data.json";
import CollectionAvatar from "./Avatar";
import Article from "../../containers/Article";

const CollectionStory: FC = ({}) => {
  const pageData = CollectionStoryData["data"]["attributes"];

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
          <Box className="flex-col -mt-7 items-center justify-center">
            <span className="w-2/12 lg:w-3/12 xl:w-2/12">
              <CollectionAvatar />
            </span>
            <H3 className="justify-center text-md">{pageData.name}</H3>
            <Box className="justify-center -mt-5 mb-5">
              <Author author={"Gokai Labs"} />
            </Box>
            <Description className="px-5 text">
              {pageData.description}
            </Description>
          </Box>
        </Article>
      </a>
    </Link>
  );
};

export default CollectionStory;
