import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";

const Box: FC<CN> = ({ className, children }) => (
  <div className={c("flex", className)}>{children}</div>
);

export default Box;
