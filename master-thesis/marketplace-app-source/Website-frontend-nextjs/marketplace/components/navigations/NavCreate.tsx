import { FC } from "react";
import MenuItem from "../fields/MenuItem";
import Nav from "../containers/Nav";

const OPTIONS = [
  { name: "Create Collections", href: "/createcollection" },
  { name: "Activate Collections", href: "/activatecollection" },
  { name: "Create NFTs", href: "/createnfts" },
];

const NavCreate: FC<{ items?: typeof OPTIONS }> = ({ items = OPTIONS }) => {
  return (
    <Nav className="flex-col">
      {items.map((item) => (
        <MenuItem key={item.name} {...item} className="btn_clear px-8" />
      ))}
    </Nav>
  );
};

export default NavCreate;
