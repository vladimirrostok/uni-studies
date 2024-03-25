import { FC } from "react";

import Layout from "../../components/Layout";
import Launchpad from "../../components/sections/launchpad";
import Box from "../../components/containers/Box";

const LaunchpadLandingPage: FC = () => {
  return (
    <Layout title="MetaMex | Launchpad">
      <Box>
        <Launchpad />
      </Box>
    </Layout>
  );
};

export default LaunchpadLandingPage;
