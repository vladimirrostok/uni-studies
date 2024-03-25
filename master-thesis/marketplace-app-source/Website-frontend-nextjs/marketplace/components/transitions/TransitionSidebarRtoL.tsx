import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";
import { Transition } from "@headlessui/react";

interface TransitionSidebarRtoLProps extends CN {
  isShowing?: boolean;
}

const TransitionSidebarRtoL: FC<TransitionSidebarRtoLProps> = ({
  className,
  children,
  isShowing,
}) => {
  return (
    <Transition
      show={isShowing}
      enter="transition-opacity duration-300"
      enterFrom="opacity-0"
      enterTo="opacity-100"
      leave="transition-opacity duration-300"
      leaveFrom="opacity-100"
      leaveTo="opacity-0"
      className={c(className)}
    >
      {children}
    </Transition>
  );
};

export default TransitionSidebarRtoL;
