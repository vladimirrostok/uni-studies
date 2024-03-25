import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FormCreateCollection from "../components/forms/FormCreateCollection";
import FullWidth from "../components/containers/FullWidth";
import AuthRequired from "../components/containers/AuthContainer";

const CreateCollectionPage: FC = () => {
  return (
    <AuthRequired>
      <Layout title="Create Collection | MetaMex">
        <FullWidth className="flex flex-col w-screen justify-center items-center">
          <H1 className="mx-auto my-auto font-feature text-4xl xs:text-5xl sm:text-5xl md:text-6xl">
            {"Create Collections"}
          </H1>
          <FormCreateCollection />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default CreateCollectionPage;
