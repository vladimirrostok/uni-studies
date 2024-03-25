import { FC, useState } from "react";
import Link from "next/link";
import Box from "../../containers/Box";
import { Menu } from "@headlessui/react";
import OutsideClickHandler from "react-outside-click-handler";

const Logo: FC = () => {
  const [isShowing, setIsShowing] = useState(false);

  return (
    <Menu>
      <Box className="relative inline-block text-left h-20 items-center">
        <OutsideClickHandler
          onOutsideClick={() => {
            setIsShowing((isShowing) => false);
          }}
        >
          <Menu.Button aria-label="Login">
            <Box className="flex items-center mt-2 ml-0">
              <Box className="w-11 h-11 lg:ml-5">
                <img
                  src="/static/images/MetaMexLogo.png"
                  alt="MetaMex MarketPlace"
                />
              </Box>
              <Link href="/">
                <a className="font-feature text-sky-400 text-3xl ml-4">
                  {"MetaMex"}
                </a>
              </Link>
            </Box>
          </Menu.Button>
        </OutsideClickHandler>
      </Box>
    </Menu>
  );
};

export default Logo;
