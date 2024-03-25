import { FC } from "react";

import Layout from "../../components/Layout";
import Profile from "../../components/sections/profile";
import FullWidth from "../../components/containers/FullWidth";

const ProfilePage: FC = () => {
  return (
    <Layout title="MetaMex | Profile">
      <FullWidth>
        <Profile />
      </FullWidth>
    </Layout>
  );
};

export default ProfilePage;
