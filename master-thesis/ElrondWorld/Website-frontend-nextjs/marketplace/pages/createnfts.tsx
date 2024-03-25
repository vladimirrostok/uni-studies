import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FormCreate from "../components/forms/FormCreate";
import FullWidth from "../components/containers/FullWidth";
import AuthRequired from "../components/containers/AuthContainer";

const CreatePage: FC = () => {
  return (
    <AuthRequired>
      <Layout title="Create NFT | MetaMex">
        <FullWidth className="flex flex-col w-screen justify-center items-center">
          <H1 className="mx-auto my-auto font-feature text-3xl md:text-5xl lg:text-6xl">
            {"Update the Metaverse"}
          </H1>
          <FormCreate />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default CreatePage;
