import { FC } from "react";
import Layout from "../components/Layout";
import H1 from "../components/fields/H1";
import FullWidth from "../components/containers/FullWidth";
import FormEditProfile from "../components/forms/FormEditProfile";
import AuthRequired from "../components/containers/AuthContainer";

const CreatePage: FC = () => {
  return (
    <AuthRequired>
      <Layout title="Profile Settings | MetaMex">
        <FullWidth className="flex flex-col w-screen justify-center items-center">
          <H1 className="font-feature mx-auto">{"Profile Settings"}</H1>
          <FormEditProfile />
        </FullWidth>
      </Layout>
    </AuthRequired>
  );
};

export default CreatePage;
