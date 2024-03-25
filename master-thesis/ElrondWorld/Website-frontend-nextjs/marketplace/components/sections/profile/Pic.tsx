import { FC, HTMLProps } from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "../../containers/Box";

import ProfileAvatarData from "./data.json";

interface ProfileAvatarProps extends HTMLProps<HTMLElement> {
  profileImage?: string;
}

const ProfileAvatar: FC<ProfileAvatarProps> = ({
  profileImage,
  className,
  ...rest
}) => {
  const pageData = ProfileAvatarData["data"]["attributes"];
  return (
    <Link href="/profile" passHref>
      <Box className="border border-2 border-black rounded-full overflow-hidden mr-4">
        <Image
          src={
            profileImage != "" && profileImage != null
              ? profileImage
              : pageData.pic
          }
          alt={pageData.name}
          width="120"
          height="120"
          className="w-full h-auto"
        />
      </Box>
    </Link>
  );
};

export default ProfileAvatar;
