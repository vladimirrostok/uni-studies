import React, { FC, HTMLProps } from "react";
import c from "clsx";
import { ChevronRightIcon } from "@heroicons/react/solid";

export type ButtonTypes = "solid" | "clear" | "outline";

interface Props extends HTMLProps<HTMLButtonElement> {
  onClick: () => void;
  children: any;
  type?: ButtonTypes;
}

const _ProviderButton: FC<Props> = ({
  onClick,
  children,
  className,
  type,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={c(["btn group"], [className])}
      {...rest}
    >
      <span className="group-hover:bg-opacity-0">
        {children}
        <ChevronRightIcon className="h-6 w-6 ml-auto" />
      </span>
    </button>
  );
};

export default _ProviderButton;
