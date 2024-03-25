import { FC } from "react";

import { MenuAlt4Icon } from "@heroicons/react/outline";
import Box from "../../containers/Box";
import TransitionSidebar from "../../transitions/TransitionSidebarRtoL";

import { Menu } from "@headlessui/react";
import NavSideOptions from "../../navigations/NavSideOptions";

const SidebarMobile: FC = () => {
  return (
    <Menu>
      <Box className=" inline-block text-left h-20">
        <Menu.Button aria-label="Menu">
          <MenuAlt4Icon className="h-20 w-16 px-4 text-sky-400 hover:text-sky-500" />
        </Menu.Button>
        <TransitionSidebar className="absolute left-0 top-20 w-screen sm:w-96 h-screen py-10 px-4 lg:px-10 text-white text-xl font-bold bg-black focus:outline-none">
          <Menu.Items>
            <NavSideOptions />
          </Menu.Items>
        </TransitionSidebar>
      </Box>
    </Menu>
  );
};

export default SidebarMobile;
