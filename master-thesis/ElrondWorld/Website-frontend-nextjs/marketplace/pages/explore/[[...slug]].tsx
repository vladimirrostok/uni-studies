import { FC } from "react";
import Layout from "../../components/Layout";
import Box from "../../components/containers/Box";
import H1 from "../../components/fields/H1";
import Explore from "../../components/sections/explore";
import { useRouter } from "next/router";

const MarketplacePage: FC = () => {
  return (
    <Layout title="Art Collections | MetaMex">
      <Box className="flex-col w-screen py-5 px-2 sm:p-10 lg:pt-5">
        <H1 className="mx-auto text-center font-feature lg:text-4xl lg:leading-10 lg:pb-5">
          {"Explore Collections"}
        </H1>
        <Explore />
      </Box>
    </Layout>
  );
};

export default MarketplacePage;
