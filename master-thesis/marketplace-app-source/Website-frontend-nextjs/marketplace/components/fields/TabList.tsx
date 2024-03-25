import { FC, HTMLProps } from "react";
import { Tab } from "@headlessui/react";
import c from "clsx";

interface FieldTabListProps extends HTMLProps<HTMLAnchorElement> {}

const FieldTabList: FC<FieldTabListProps> = ({
  children,
  className,
  href,
  ...rest
}) => {
  return (
    <Tab.List
      className={c(
        [
          "w-max mx-auto py-2 rounded-full font-bold transition bg-gray-900 shadow-md overflow-x-auto mb-5",
        ],
        [className]
      )}
    >
      {children}
    </Tab.List>
  );
};

export default FieldTabList;
