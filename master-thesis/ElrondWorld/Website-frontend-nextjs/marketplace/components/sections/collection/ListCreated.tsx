import { FC } from "react";
import Box from "../../containers/Box";
import CollectionStory from "../collection/Story";

const CollectionListCreated: FC = ({}) => {
  return (
    <Box className="flex-wrap my-10 -mx-2">
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <CollectionStory />
      </span>
    </Box>
  );
};

export default CollectionListCreated;
