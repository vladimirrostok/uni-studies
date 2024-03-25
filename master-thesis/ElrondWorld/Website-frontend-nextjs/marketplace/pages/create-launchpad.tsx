import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FullWidth from "../components/containers/FullWidth";
import AuthRequired from "../components/containers/AuthContainer";
import FormLaunchpad from "../components/forms/FormLaunchpad";

const CreatePage: FC = () => {
  return (
    <AuthRequired>
      <Layout title="Create Launchpad | MetaMex">
        <FullWidth className="flex h-full items-center">
          <H1 className="mx-auto">{"Add your project"}</H1>
          <FormLaunchpad />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default CreatePage;
