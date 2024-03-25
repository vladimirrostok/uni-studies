import { FC, HTMLProps } from "react";
import c from "clsx";
import Link from "next/link";

import { Menu } from "@headlessui/react";

export type MenuItemVariants = "cta1" | "cta2";

interface MenuItemProps extends HTMLProps<HTMLAnchorElement> {
  variant?: MenuItemVariants;
  name?: string;
}

const MenuItem: FC<MenuItemProps> = ({
  children,
  variant = "cta1",
  name,
  className,
  href,
  ...rest
}) => {
  return (
    <Menu.Item>
      <Link href={href || "/"}>
        <a className={c(["btn group"], [variant], [className])} {...rest}>
          <span className="group-hover:bg-opacity-0">
            {name}
            {children}
          </span>
        </a>
      </Link>
    </Menu.Item>
  );
};

export default MenuItem;
