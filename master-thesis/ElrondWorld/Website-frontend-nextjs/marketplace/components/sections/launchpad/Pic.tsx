import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "../../containers/Box";

import LaunchpadAvatarData from "./data.json";

const LaunchpadAvatar: FC = ({}) => {
  const pageData = LaunchpadAvatarData["data"]["attributes"];

  return (
    <Link href="/profile" passHref>
      <Box className="border border-4 border-black rounded-full overflow-hidden ml-5">
        <Image
          src={pageData.pic}
          alt={pageData.name}
          width="120"
          height="120"
          className="w-full h-auto"
        />
      </Box>
    </Link>
  );
};

export default LaunchpadAvatar;
