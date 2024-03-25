import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";

const Nav: FC<CN> = ({ className, children }) => (
  <nav className={c("flex text-lg", className)}>{children}</nav>
);

export default Nav;
