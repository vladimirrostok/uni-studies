import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";

const Section: FC<CN> = ({ className, children }) => (
  <section className={c(className, "flex")}>{children}</section>
);

export default Section;
