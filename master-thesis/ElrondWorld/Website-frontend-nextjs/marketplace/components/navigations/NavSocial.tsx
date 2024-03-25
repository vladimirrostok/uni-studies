import { FC } from "react";
import Hyperlink from "../fields/Hyperlink";
import Nav from "../containers/Nav";
import H3 from "../fields/H3";
import Box from "../containers/Box";
import Twitter from "../Icons/Twitter";
import Discord from "../Icons/Discord";

const NavSocial: FC = () => {
  return (
    <Box className="flex-col">
      <H3 className="text-white place-content-center sm:place-content-start">
        {"Join the community"}
      </H3>
      <Nav className="place-content-center sm:place-content-start">
        <Hyperlink
          href="https://twitter.com/ElrondWorld"
          className="mr-5 bg-gray-700 hover:bg-gray-800 p-0 rounded-full"
          target="_blank"
          aria-label="Twitter"
        >
          <Twitter className="w-6 h-6" />
        </Hyperlink>
        <Hyperlink
          href="https://dsc.gg/elrondworld"
          className="mr-0 bg-gray-700 hover:bg-gray-800 p-0 rounded-full"
          target="_blank"
          aria-label="Discord"
        >
          <Discord className="w-6 h-6" />
        </Hyperlink>
      </Nav>
    </Box>
  );
};

export default NavSocial;
