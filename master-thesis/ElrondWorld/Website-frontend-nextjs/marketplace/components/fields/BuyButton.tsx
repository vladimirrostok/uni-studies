import { FC, HTMLProps } from "react";
import c from "clsx";

export type ButtonTypes = "solid" | "clear" | "outline";

interface BuyButtonProps extends HTMLProps<HTMLButtonElement> {
  onClick: () => void;
  children: any;
  type?: ButtonTypes;
}

const BuyButton: FC<BuyButtonProps> = ({
  onClick,
  children,
  className,
  type,
  ...rest
}) => {
  return (
    <button
      onClick={onClick}
      className={c(["interactive-outline btn group"], [className])}
      {...rest}
    >
      <span className="group-hover:bg-opacity-0">{children}</span>
    </button>
  );
};

export default BuyButton;
