import { FC, useState } from "react";

import Layout from "../components/Layout";
import FullWidth from "../components/containers/FullWidth";
import Box from "../components/containers/Box";
import NavLogin from "../components/navigations/NavLogin";

import { Menu } from "@headlessui/react";

const LoginPage: FC = () => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Layout title="My Wallet | MetaMex">
      <FullWidth className="flex flex-col w-screen justify-center items-center">
        <Box className="h-full text-center items-center flex-col w-full md:w-1/2 xl:w-1/3 mx-auto pt-5">
          <Menu>
            <NavLogin
              toggleSidebar={() => setIsShowing((isShowing) => !isShowing)}
            />
          </Menu>
        </Box>
      </FullWidth>
    </Layout>
  );
};

export default LoginPage;
