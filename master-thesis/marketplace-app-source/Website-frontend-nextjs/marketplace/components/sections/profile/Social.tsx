import { FC } from "react";
import Hyperlink from "../../fields/Hyperlink";
import Twitter from "../../Icons/Twitter";
import Discord from "../../Icons/Discord";
import Nav from "../../containers/Nav";
import Facebook from "../../Icons/Facebook";
import Telegram from "../../Icons/Telegram";
import Instagram from "../../Icons/Instagram";
import { GlobeAltIcon } from "@heroicons/react/solid";

export interface ProfileSocialProps {
  website: string;
  twitter: string;
  discord: string;
  telegram: string;
  instagram: string;
  facebook: string;
}

const ProfileSocial: FC<ProfileSocialProps> = ({
  website,
  twitter,
  discord,
  telegram,
  instagram,
  facebook,
}) => {
  return (
    <Nav className="flex-wrap justify-center">
      <Hyperlink
        href={website}
        target="_blank"
        className="p-0"
        aria-label="Website"
      >
        <GlobeAltIcon className="w-8 h-8 text-sky-400 hover:text-sky-500 mx-0 md:mx-2" />
      </Hyperlink>
      <Hyperlink
        href={"https://twitter.com/" + twitter}
        target="_blank"
        aria-label="Twitter"
      >
        <Twitter className="w-6 h-6 text-sky-400 hover:text-sky-500 mx-0 md:mx-2" />
      </Hyperlink>
      <Hyperlink
        href={"https://discordapp.com/users/" + discord}
        target="_blank"
        aria-label="Discord"
      >
        <Discord className="w-6 h-6 text-sky-400 hover:text-sky-500 mx-0 md:mx-2" />
      </Hyperlink>
      <Hyperlink
        href={"https://t.me/" + telegram}
        target="_blank"
        aria-label="Telegram"
      >
        <Telegram className="w-6 h-6 text-sky-400 hover:text-sky-500 mx-0 md:mx-2" />
      </Hyperlink>
      <Hyperlink
        href={"https://www.instagram.com/" + instagram}
        target="_blank"
        aria-label="Instagram"
      >
        <Instagram className="w-6 h-6 text-sky-400 hover:text-sky-500 mx-0 md:mx-2" />
      </Hyperlink>
      <Hyperlink
        href={"https://www.facebook.com/" + facebook}
        target="_blank"
        aria-label="Facebook"
      >
        <Facebook className="w-6 h-6 text-sky-400 hover:text-sky-500 mx-0 md:mx-2" />
      </Hyperlink>
    </Nav>
  );
};

export default ProfileSocial;
