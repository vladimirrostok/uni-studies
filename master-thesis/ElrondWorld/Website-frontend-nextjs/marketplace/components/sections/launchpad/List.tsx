import { FC } from "react";
import Box from "../../containers/Box";
import LaunchpadStory from "../launchpad/Story";

const LaunchpadList: FC = ({}) => {
  return (
    <Box className="flex-wrap">
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <LaunchpadStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <LaunchpadStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <LaunchpadStory />
      </span>
      <span className="md:w-1/2 lg:w-1/3 xl:w-1/4">
        <LaunchpadStory />
      </span>
    </Box>
  );
};

export default LaunchpadList;
