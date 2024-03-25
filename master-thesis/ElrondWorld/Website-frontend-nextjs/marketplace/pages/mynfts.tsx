import { FC } from "react";
import Layout from "../components/Layout";
import Box from "../components/containers/Box";
import H1 from "../components/fields/H1";
import NftList from "../components/sections/nft/List";

const AllNftPage: FC = () => {
  return (
    <Layout title="My NFTs | MetaMex">
      <Box className="flex-col w-full py-5 px-2 sm:p-10">
        <H1 className="mx-auto">{"9 233 Results"}</H1>
        <NftList nftItems={null} />
      </Box>
    </Layout>
  );
};

export default AllNftPage;
