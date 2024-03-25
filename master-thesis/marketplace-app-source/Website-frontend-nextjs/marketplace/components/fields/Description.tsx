import { FC, HTMLProps } from "react";
import c from "clsx";

interface DescriptionProps extends HTMLProps<HTMLParagraphElement> {
  variant?: "smaller";
}

const Description: FC<DescriptionProps> = ({
  children,
  variant = "smaller",
  className,
  href,
  ...rest
}) => {
  return (
    <p
      className={c(
        ["font-light mb-10 text-lg"],
        [
          "text-transparent bg-clip-text bg-gradient-to-br from-gray-300 to-gray-400",
        ],
        [variant],
        [className]
      )}
      {...rest}
    >
      {children}
    </p>
  );
};

export default Description;
