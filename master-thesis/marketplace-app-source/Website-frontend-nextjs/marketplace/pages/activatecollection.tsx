import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FormActivateCollection from "../components/forms/FormActivateCollection";
import FullWidth from "../components/containers/FullWidth";
import AuthRequired from "../components/containers/AuthContainer";

const CreatePage: FC = () => {
  return (
    <AuthRequired>
      <Layout title="Activate Collections | MetaMex">
        <FullWidth className="flex flex-col w-screen justify-center items-center">
          <H1 className="mx-auto my-auto font-feature text-4xl xs:text-5xl sm:text-5xl md:text-6xl">
            {"Activate Collections"}
          </H1>
          <FormActivateCollection />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default CreatePage;
