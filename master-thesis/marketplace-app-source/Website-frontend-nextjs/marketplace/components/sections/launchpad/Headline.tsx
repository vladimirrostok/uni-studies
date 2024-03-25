import { FC } from "react";
import Box from "../../containers/Box";
import LaunchpadHeadlineData from "./data.json";
import Nav from "../../containers/Nav";
import Hyperlink from "../../fields/Hyperlink";
import Twitter from "../../Icons/Twitter";
import Discord from "../../Icons/Discord";
import Facebook from "../../Icons/Facebook";
import Telegram from "../../Icons/Telegram";
import Instagram from "../../Icons/Instagram";
import { GlobeAltIcon } from "@heroicons/react/solid";
import Description from "../../fields/Description";
import H1 from "../../fields/H1";
import H2 from "../../fields/H2";

const LaunchpadHeadline: FC = ({}) => {
  const pageData = LaunchpadHeadlineData["data"]["attributes"];

  return (
    <Box className="launchpad_headline flex-col items-star md:w-6/12 mb-10 md:mb-0 relative z-20">
      <H2 className="z-20">Ends in: 1d 5h 11m 8s</H2>
      <H1 className="collection_name text-white sm:text-5xl z-20 -mt-5">
        {pageData.collectionName}
      </H1>
      <Description className="text-white">
        Duis vel nibh at velit scelerisque suscipit. Donec venenatis vulputate
        lorem. Praesent nonummy mi in odio. Vestibulum ante ipsum primis in
        faucibus orci luctus et ultrices posuere cubilia Curae; In ac dui quis
        mi consectetuer lacinia. Suspendisse nisl elit, rhoncus eget, elementum
        ac, condimentum eget, diam. Quisque id odio. Aenean imperdiet. Morbi nec
        metus.
      </Description>
      <Nav className="flex-row -mt-5">
        <Hyperlink
          href="https://twitter.com/GokaiLabs"
          target="_blank"
          aria-label="Twitter"
          className="mr-2"
        >
          <Twitter className="w-6 h-6 text-white" />
        </Hyperlink>
        <Hyperlink
          href="https://dsc.gg/elrondworld"
          target="_blank"
          aria-label="Discord"
          className="mr-2"
        >
          <Discord className="w-6 h-6 text-white" />
        </Hyperlink>
        <Hyperlink
          href="https://facebook.com/gokaiorg"
          target="_blank"
          aria-label="Facebook"
          className="mr-2"
        >
          <Facebook className="w-6 h-6 text-white" />
        </Hyperlink>
        <Hyperlink
          href="https://telegram.com/gokaiorg"
          target="_blank"
          aria-label="Telegram"
          className="mr-2"
        >
          <Telegram className="w-6 h-6 text-white" />
        </Hyperlink>
        <Hyperlink
          href="https://instagram.com/gokaiorg"
          target="_blank"
          aria-label="Instagram"
          className="mr-2"
        >
          <Instagram className="w-6 h-6 text-white" />
        </Hyperlink>
        <Hyperlink
          href="https://gokai.org"
          target="_blank"
          aria-label="Website"
          className="mr-2"
        >
          <GlobeAltIcon className="w-8 h-8 text-white" />
        </Hyperlink>
      </Nav>
    </Box>
  );
};

export default LaunchpadHeadline;
