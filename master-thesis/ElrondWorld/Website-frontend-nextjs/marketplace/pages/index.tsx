import { FC } from "react";
import Layout from "../components/Layout";
import Hero from "../components/sections/hero";
import Trending from "../components/sections/trending";
import Box from "../components/containers/Box";

const IndexPage: FC = () => {
  return (
    <Layout title="MetaMex | Marketplace">
      <Box className="flex flex-col px-2 sm:p-10 w-full">
        <Hero />
        <Trending />
      </Box>
    </Layout>
  );
};

export default IndexPage;
