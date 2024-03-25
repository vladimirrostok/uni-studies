import { FC, HTMLProps } from "react";
import c from "clsx";

interface FieldLabelProps extends HTMLProps<HTMLHeadingElement> {}

const FieldLabel: FC<FieldLabelProps> = ({ children, className, htmlFor }) => {
  return (
    <label
      className={c(["mb-1 text-md text-gray-300 font-bold"], [className])}
      htmlFor={c([htmlFor])}
    >
      {children}
    </label>
  );
};

export default FieldLabel;
