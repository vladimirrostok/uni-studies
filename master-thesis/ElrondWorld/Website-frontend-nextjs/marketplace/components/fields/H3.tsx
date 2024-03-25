import { FC, HTMLProps } from "react";
import c from "clsx";

interface H1Props extends HTMLProps<HTMLHeadingElement> {}

const H3: FC<H1Props> = ({ children, className, href, ...rest }) => {
  return (
    <h3
      className={c(["flex items-center font-bold text-xl text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500"], ["mb-5"], [className])}
      {...rest}
    >
      {children}
    </h3>
  );
};

export default H3;
