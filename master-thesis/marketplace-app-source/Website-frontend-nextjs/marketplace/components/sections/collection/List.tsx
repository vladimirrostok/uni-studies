import { FC } from "react";
import Box from "../../containers/Box";
import CollectionStory from "../collection/Story";

const CollectionList: FC = ({}) => {
  return (
    <Box className="flex-wrap my-10">
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
    </Box>
  );
};

export default CollectionList;
