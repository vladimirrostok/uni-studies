import { FC, HTMLProps } from "react";
import c from "clsx";

interface H1Props extends HTMLProps<HTMLHeadingElement> {}

const H2: FC<H1Props> = ({ children, className, href, ...rest }) => {
  return (
    <h2
      className={c(
        ["inline-flex items-center text-2xl font-bold"],
        ["mb-10"],
        [className]
      )}
      {...rest}
    >
      {children}
    </h2>
  );
};

export default H2;
