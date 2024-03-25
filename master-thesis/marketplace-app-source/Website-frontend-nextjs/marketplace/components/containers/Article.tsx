import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";

const Article: FC<CN> = ({ className, children }) => (
  <article className={c("flex w-full", className)}>{children}</article>
);

export default Article;
