import { FC, HTMLProps } from "react";
import c from "clsx";

interface FieldInputProps extends HTMLProps<HTMLInputElement> {}

const FieldInput: FC<FieldInputProps> = ({
  children,
  className,
  type,
  id,
  name,
  placeholder,
  value,
  ...rest
}) => {
  return (
    <input
      className={c(
        [
          "inline-flex mb-2 items-center p-4 rounded-full font-bold transition bg-gray-900 hover:bg-gray-700 shadow-md border-2 border-black focus:border-sky-500",
        ],
        [className]
      )}
      type={c([type])}
      id={c([id])}
      name={c([name])}
      placeholder={c([placeholder])}
      {...rest}
    >
      {children}
    </input>
  );
};

export default FieldInput;
