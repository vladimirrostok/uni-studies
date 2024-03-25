import c from "clsx";
import { FC } from "react";

import { CN } from "../../utils/types";
import { Transition } from "@headlessui/react";

interface TransitionSidebarProps extends CN {
  isShowing?: boolean;
}

const TransitionSidebar: FC<TransitionSidebarProps> = ({
  className,
  children,
  isShowing,
}) => {
  return (
    <Transition
      show={isShowing}
      enter="transition ease-in duration-300 transform"
      enterFrom="translate-x-full"
      enterTo="translate-x-0"
      leave="transition ease-out duration-300 transform"
      leaveFrom="translate-x-0"
      leaveTo="translate-x-full"
      className={c(className)}
    >
      {children}
    </Transition>
  );
};

export default TransitionSidebar;
