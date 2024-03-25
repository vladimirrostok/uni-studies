import React, { useState } from "react";
import Collapsible from "react-collapsible";
import NextLink from "next/link";
import Arrow from "../Icons/nav-side-options/arrow";
import c from "clsx";

export interface navSideCollapsibleOptionsProps {
  name: string;
  icon: React.ReactElement;
  items: navSideCollapsibleOptionsItem[];
}

export interface navSideCollapsibleOptionsItem {
  name: string;
  link: string;
}

const NavSideCollapsibleOption: React.FC<navSideCollapsibleOptionsProps> = ({
  name,
  icon,
  items,
}) => {
  const [open, setOpen] = useState(false);

  const handleTriggerClick = () => {
    setOpen(!open);
  };

  var optionsReturned = [];

  if (items) {
    for (var i = 0; i < items.length; i++) {
      optionsReturned.push(
        <>
          <li>
            <NextLink href={items[i].link}>
              <a className="inline-block w-full px-4 py-2 text-base rounded hover:bg-gray-800 hover:text-white focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white">
                {items[i].name}
              </a>
            </NextLink>
          </li>
        </>
      );
    }
  }

  return (
    <Collapsible
      {...{ open, handleTriggerClick }}
      trigger={
        <>
          <div className="relative flex justify-between text-gray-400 hover:text-white focus-within:text-white">
            <div className="flex items-center w-full">
              <div className="absolute inset-y-0 left-0 flex items-center pl-2 pointer-events-none">
                {icon}
              </div>
              <NextLink href="#">
                <a className="inline-block w-full py-2 pl-8 pr-4 text-base rounded hover:bg-gray-800 focus:outline-none focus:ring-1 focus:ring-gray-500 focus:bg-gray-800">
                  {name}
                </a>
              </NextLink>
            </div>
            <button
              className="absolute right-0 inline-block mt-2 mr-2 p-0 text-gray-400 bg-gray-700 rounded focus:outline-none focus:ring-1 focus:ring-gray-500 focus:text-white"
              tabIndex={-1}
            >
              <Arrow
                className={c(
                  ["w-5 h-5 stroke-current transition-transform duration-800"],
                  [open ? "rotate-180" : ""]
                )}
              />
            </button>
          </div>
        </>
      }
    >
      <div className="pt-2 pl-4">
        <ul className="flex flex-col w-60 px-4 text-gray-400 border-l border-fuchsia-500">
          <li>{optionsReturned}</li>
        </ul>
      </div>
    </Collapsible>
  );
};

export default NavSideCollapsibleOption;
