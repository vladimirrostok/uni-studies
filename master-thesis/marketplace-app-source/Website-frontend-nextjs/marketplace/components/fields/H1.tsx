import { FC, HTMLProps } from "react";
import c from "clsx";

interface H1Props extends HTMLProps<HTMLHeadingElement> {
  variant?: "page404";
}

const H1: FC<H1Props> = ({
  children,
  variant = "page404",
  className,
  href,
  ...rest
}) => {
  return (
    <h1
      className={c(
        ["flex items-center my-5"],
        ["text-2xl sm:text-4xl xl:text-6xl font-black"],
        [
          "text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500",
        ],
        [variant],
        [className]
      )}
      {...rest}
    >
      {children}
    </h1>
  );
};

export default H1;
