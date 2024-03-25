import { FC, HTMLProps } from "react";
import Image from "next/image";
import Box from "../../containers/Box";
import ProfileBannerData from "./data.json";

interface ProfileBannerProps extends HTMLProps<HTMLElement> {
  profileBanner: string;
}

const ProfileBanner: FC<ProfileBannerProps> = ({
  profileBanner,
  className,
  ...rest
}) => {
  const pageData = ProfileBannerData["data"]["attributes"];

  return (
    <Box className="profile_banner max-h-48 flex-col rounded-xl overflow-hidden">
      <Image
        src={
          profileBanner != "" && profileBanner != null
            ? profileBanner
            : pageData.pic
        }
        alt={pageData.name}
        width="1500"
        height="500"
        className="w-full h-full object-cover"
      />
    </Box>
  );
};

export default ProfileBanner;
