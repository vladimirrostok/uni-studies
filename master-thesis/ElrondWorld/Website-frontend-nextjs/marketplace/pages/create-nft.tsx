import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FullWidth from "../components/containers/FullWidth";
import AuthRequired from "../components/containers/AuthContainer";
import FormCreateNFT from "../components/forms/FormCreateNFT";

const CreateNftPage: FC = () => {
  return (
    <AuthRequired>
      <Layout title="Create NFT | MetaMex">
        <FullWidth className="flex flex-col w-screen h-screen justify-center items-center">
          <H1 className="mx-auto my-auto font-feature text-5xl md:text-6xl">
            {"Create NFT"}
          </H1>
          <FormCreateNFT />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default CreateNftPage;
