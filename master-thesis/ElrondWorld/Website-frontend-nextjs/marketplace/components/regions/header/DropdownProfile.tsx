import { FC } from "react";
import { Menu } from "@headlessui/react";

import Box from "../../containers/Box";
import TransitionDropdown from "../../transitions/TransitionDropdown";
import { UserCircleIcon } from "@heroicons/react/solid";
import NavProfile from "../../navigations/NavProfile";

const OPTIONS = [{ name: "Profile", href: "/profile" }];

const DropdownProfile: FC<{ items?: typeof OPTIONS }> = ({
  items = OPTIONS,
}) => {
  return (
    <Menu>
      <Box className="relative inline-block text-left h-20">
        <Menu.Button aria-label="Profile">
          <UserCircleIcon className="h-20 w-20 px-6 text-sky-400 hover:text-sky-500" />
        </Menu.Button>
        <TransitionDropdown className="absolute top-20 text-xl font-bold bg-gray-800 sm:shadow-md rounded-b-lg focus:outline-none overflow-hidden">
          <Menu.Items>
            <NavProfile />
          </Menu.Items>
        </TransitionDropdown>
      </Box>
    </Menu>
  );
};

export default DropdownProfile;
