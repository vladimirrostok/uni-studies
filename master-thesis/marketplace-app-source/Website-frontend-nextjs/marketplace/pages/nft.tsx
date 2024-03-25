import { FC } from "react";
import Layout from "../components/Layout";
import FullWidth from "../components/containers/FullWidth";

const NftPage: FC = () => {
  return (
    <Layout title="NFT Details | MetaMex">
      <FullWidth>
        {
          "That's a temporary plug, Go to page like http://localhost:3000/nft-details/EWC01-6c2cea-01"
        }
      </FullWidth>
    </Layout>
  );
};

export default NftPage;
