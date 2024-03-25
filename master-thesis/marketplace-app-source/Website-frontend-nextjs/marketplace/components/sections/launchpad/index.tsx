import { FC } from "react";
import LaunchpadTop from "./Top";
import Box from "../../containers/Box";

const Launchpad: FC = ({}) => {
  return (
    <Box className="launchpad flex-col">
      <LaunchpadTop />
    </Box>
  );
};

export default Launchpad;
