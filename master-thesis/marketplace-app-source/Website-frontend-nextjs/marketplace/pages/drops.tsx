import { FC } from "react";
import Layout from "../components/Layout";
import Box from "../components/containers/Box";
import H2 from "../components/fields/H2";
import LaunchpadList from "../components/sections/launchpad/List";
import LaunchpadHighlight from "../components/sections/launchpad/Highlight";
import Hyperlink from "../components/fields/Hyperlink";

const LaunchpadPage: FC = () => {
  return (
    <Layout title="Drops | MetaMex">
      <LaunchpadHighlight />
      <Box className="flex-col w-full py-5 px-2 sm:p-10">
        <H2 className="px-5 sm:text-3xl font-feature text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 mr-auto">
          {"Current"}
        </H2>
        <LaunchpadList />
        <H2 className="px-5 sm:text-3xl font-feature text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 mr-auto">
          {"Upcoming"}
        </H2>
        <LaunchpadList />
        <H2 className="px-5 sm:text-3xl font-feature text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500 mr-auto">
          {"Ended"}
        </H2>
        <LaunchpadList />
        <Hyperlink href="/create-launchpad" className="btn_solid my-10 mx-auto">
          {"Add your project"}
        </Hyperlink>
      </Box>
    </Layout>
  );
};

export default LaunchpadPage;
