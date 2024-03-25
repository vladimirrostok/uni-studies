import { FC } from "react";
import { Popover } from "@headlessui/react";
import { InformationCircleIcon } from "@heroicons/react/outline";

import { CN } from "../../utils/types";
import Description from "../fields/Description";

const PopoverDescription: FC<CN> = ({ className, children }) => {
  return (
    <Popover className="relative flex items-center ml-4">
      {({ open }) => (
        <>
          <Popover.Button className="h-6 w-6 text-sky-500">
            <InformationCircleIcon className={`${open ? "" : ""}`} />
          </Popover.Button>
          <Popover.Panel className="absolute top-8 z-10 box_background border border-sky-500 p-5">
            <Description className="lg:min-w-[220px]">{children}</Description>
          </Popover.Panel>
        </>
      )}
    </Popover>
  );
};

export default PopoverDescription;
