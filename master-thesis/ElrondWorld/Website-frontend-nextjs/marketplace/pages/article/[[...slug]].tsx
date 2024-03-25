import { FC } from "react";

import Layout from "../../components/Layout";
import BlogPost from "../../components/blog/blogPost/BlogPost";

const ArticlePage: FC = () => {
  return (
    <Layout title="MetaMex | Article">
      <BlogPost />
    </Layout>
  );
};

export default ArticlePage;
