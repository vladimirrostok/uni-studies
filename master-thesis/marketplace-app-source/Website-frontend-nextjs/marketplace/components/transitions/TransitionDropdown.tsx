import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";
import { Transition } from "@headlessui/react";

const TransitionDropdown: FC<CN> = ({ className, children }) => (
  <Transition
    enter="transition ease-out duration-600 transform"
    leave="transition ease-in duration-600 transform"
    className={c(className)}
  >
    {children}
  </Transition>
);

export default TransitionDropdown;
