import { FC } from "react";

import MenuItem from "../fields/MenuItem";
import Nav from "../containers/Nav";
import Hyperlink from "../fields/Hyperlink";
import { LightningBoltIcon } from "@heroicons/react/solid";

const OPTIONS = [
  { name: "Explore", href: "/explore" },
  { name: "All NFTs", href: "/allnfts" },
  { name: "Create", href: "/create" },
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/profile-settings" },
];

const NavMobile: FC<{ items?: typeof OPTIONS }> = ({ items = OPTIONS }) => {
  return (
    <Nav className="flex flex-col w-screen justify-center items-center">
      {items.map((item) => (
        <MenuItem key={item.name} {...item} className="btn_clear" />
      ))}
      <Hyperlink href="/wallet" className="btn_outline mx-auto mt-10">
        <LightningBoltIcon className="h-6 w-6 mr-4 -ml-4" />
        {"Wallet"}
      </Hyperlink>
    </Nav>
  );
};

export default NavMobile;
