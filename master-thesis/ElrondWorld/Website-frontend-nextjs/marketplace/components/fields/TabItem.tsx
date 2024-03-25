import React, { FC, HTMLProps } from "react";

import { Tab } from "@headlessui/react";

interface FieldTabItemProps extends HTMLProps<HTMLAnchorElement> {
  name?: string;
}

const FieldTabItem: FC<FieldTabItemProps> = ({
  children,
  className,
  name,
  ...rest
}) => {
  return (
    // @ts-ignore
    <Tab
      className={({ selected }) =>
        selected
          ? "text-sky-500 bg-black mx-2 px-4 py-1 rounded-full text-lg transition border border-sky-500"
          : "hover:text-sky-500 mx-2 px-4 py-1 rounded-full text-lg transition border border-gray-900"
      }
      {...rest}
    >
      <h2>
        {name}
        {children}
      </h2>
    </Tab>
  );
};

export default FieldTabItem;
