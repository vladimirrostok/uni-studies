import { FC } from "react";

import MenuItem from "../fields/MenuItem";
import Nav from "../containers/Nav";

const OPTIONS = [
  { name: "Profile", href: "/profile" },
  { name: "Settings", href: "/profile-settings" },
  // { name: "My NFTs", href: "/mynfts" },
];

const NavProfile: FC<{ items?: typeof OPTIONS }> = ({ items = OPTIONS }) => {
  return (
    <Nav className="flex-col">
      {items.map((item) => (
        <MenuItem key={item.name} {...item} className="btn_clear px-8" />
      ))}
    </Nav>
  );
};

export default NavProfile;
