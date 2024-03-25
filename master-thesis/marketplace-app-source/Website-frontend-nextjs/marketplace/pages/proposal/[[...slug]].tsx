import { FC } from "react";

import Layout from "../../components/Layout";
import Proposal from "../../components/governance/Proposal/Proposal";

const ArticlePage: FC = () => {
  return (
    <Layout title="MetaMex | Article">
      <Proposal />
    </Layout>
  );
};

export default ArticlePage;
