import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "../../containers/Box";
import H3 from "../../fields/H3";
import Author from "../collection/Author";

import LaunchpadStoryData from "./data.json";
import ProfileAvatar from "../profile/Pic";
import Article from "../../containers/Article";

const LaunchpadStory: FC = ({}) => {
  const pageData = LaunchpadStoryData["data"]["attributes"];

  return (
    <Link href="/launchpad">
      <a className="launchpad_story block mb-8 md:mx-4">
        <Article className="flex-col bg-gray-900 shadow-md rounded-lg overflow-hidden">
          <Image
            src={pageData.banner}
            alt={pageData.name}
            width="250"
            height="350"
            className="max-h-1 hidden w-full object-cover"
          />
          <H3 className="text-md mx-4 mt-4">{pageData.name}</H3>
          <Box className="flex-row items-center mx-4 mb-4 -mt-4">
            <span className="w-2/12 lg:w-3/12 xl:w-2/12">
              <ProfileAvatar />
            </span>
            <Box className="">
              <Author author={"Gokai Labs"} />
            </Box>
          </Box>
        </Article>
      </a>
    </Link>
  );
};

export default LaunchpadStory;
