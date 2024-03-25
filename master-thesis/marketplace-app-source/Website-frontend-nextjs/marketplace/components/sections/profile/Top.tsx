import { FC, HTMLProps } from "react";
import Box from "../../containers/Box";
import H1 from "../../fields/H1";
import Description from "../../fields/Description";
import ProfilePic from "./Pic";
import ProfileBanner from "./Banner";
import H2 from "../../fields/H2";
import ProfileSocial, { ProfileSocialProps } from "./Social";

interface ProfileTopAvatarProps extends HTMLProps<HTMLElement> {
  profileName: string;
  profileImage: string;
  profileBanner: string;
  herotag: string;
  walletAddress: string;
  created_at: string;
  socialProps: ProfileSocialProps;
}

const ProfileTop: FC<ProfileTopAvatarProps> = ({
  profileName,
  profileImage,
  profileBanner,
  herotag,
  walletAddress,
  created_at,
  className,
  socialProps,
  ...rest
}) => {
  const usrWallet = walletAddress
    ? walletAddress.substring(0, 4) +
      "..." +
      walletAddress.substring(walletAddress.length - 6, walletAddress.length)
    : "";

  return (
    <Box className="profile_top flex-col overflow-hidden mb-5">
      <ProfileBanner profileBanner={profileBanner} />
      <Box className="flex-col -mt-24 items-center justify-center z-10">
        <ProfilePic profileImage={profileImage} />
        <Description>
          {created_at != "" && created_at != null
            ? "Joined " + created_at
            : "Joined"}
        </Description>
        <H2 className="-mt-10">
          {herotag != "" && herotag != null ? herotag : "Loading"} - {usrWallet}
        </H2>
        <H1 className="font-feature -mt-5 justify-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
          {profileName != "" && profileName != null ? profileName : ""}
        </H1>
        <ProfileSocial
          website={socialProps.website}
          twitter={socialProps.twitter}
          discord={socialProps.discord}
          telegram={socialProps.telegram}
          instagram={socialProps.instagram}
          facebook={socialProps.facebook}
        />
      </Box>
    </Box>
  );
};

export default ProfileTop;
