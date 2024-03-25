import { FC, HTMLProps } from "react";
import c from "clsx";

interface FieldSubmitProps extends HTMLProps<HTMLHeadingElement> {}

const FieldSubmit: FC<FieldSubmitProps> = ({
  children,
  className,
  type,
  id,
  name,
  placeholder,
  value,
}) => {
  return (
    <input
      className={c(
        [
          "inline-flex mb-5 items-center p-4 rounded-full font-bold transition shadow-md px-10 bg-gray-900 hover:bg-gray-700 shadow-md",
        ],
        [className]
      )}
      type={c([type])}
      id={c([id])}
      name={c([name])}
      value={c([value])}
    >
      {children}
    </input>
  );
};

export default FieldSubmit;
