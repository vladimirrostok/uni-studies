import { FC } from "react";

import Layout from "../components/Layout";
import Collection from "../components/sections/collection";

const CollectionPage: FC = () => {
  return (
    <Layout title="Collection | MetaMex">
      <Collection />
    </Layout>
  );
};

export default CollectionPage;
