import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";

const FullWidth: FC<CN> = ({ className, children }) => (
  <div className={className}>
    <div className={c("container mx-auto flex flex-col px-2 sm:p-10")}>
      {children}
    </div>
  </div>
);

export default FullWidth;
