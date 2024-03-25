import { FC } from "react";
import Box from "../../containers/Box";
import LaunchpadBanner from "./Banner";
import LaunchpadTopData from "./data.json";

const LaunchpadTop: FC = ({}) => {
  const pageData = LaunchpadTopData["data"]["attributes"];

  return (
    <Box className="profile_top flex-col overflow-hidden">
      <LaunchpadBanner />
    </Box>
  );
};

export default LaunchpadTop;
