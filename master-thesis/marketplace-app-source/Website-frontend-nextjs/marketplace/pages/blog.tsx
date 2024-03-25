import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FullWidth from "../components/containers/FullWidth";
import AuthRequired from "../components/containers/AuthContainer";
import ListBlogs from "../components/blog/list-blogs";

const Blog: FC = () => {
  return (
    <AuthRequired>
      <Layout title="News">
        <FullWidth className="flex flex-col w-screen justify-center items-center">
          <H1 className="mx-auto font-feature lg:text-4xl pb-10">
            {"Community News"}
          </H1>
          <ListBlogs />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default Blog;
