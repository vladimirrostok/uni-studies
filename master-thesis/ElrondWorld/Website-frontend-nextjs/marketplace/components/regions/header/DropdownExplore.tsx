import { FC } from "react";
import { Menu } from "@headlessui/react";

import Box from "../../containers/Box";
import NavExplore from "../../navigations/NavExplore";
import TransitionDropdown from "../../transitions/TransitionDropdown";

// Refactor : Not sure why this is here
const OPTIONS = [];

const DropdownExplore: FC<{ items?: typeof OPTIONS }> = ({
  items = OPTIONS,
}) => {
  return (
    <Menu>
      <Box className="relative inline-block text-left h-20">
        <Menu.Button className="p-6 font-feature text-violet-200 hover:text-fuchsia-500 hover:animate-pulse h-20 text-xl">
          {"Trade"}
        </Menu.Button>
        <TransitionDropdown className="absolute top-20 text-xl font-bold bg-gray-800 sm:shadow-md rounded-b-lg focus:outline-none overflow-hidden">
          <Menu.Items>
            <NavExplore />
          </Menu.Items>
        </TransitionDropdown>
      </Box>
    </Menu>
  );
};

export default DropdownExplore;
