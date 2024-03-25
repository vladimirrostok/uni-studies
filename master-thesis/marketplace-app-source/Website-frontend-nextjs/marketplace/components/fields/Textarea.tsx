import { FC, HTMLProps } from "react";
import c from "clsx";

interface FieldTextareaProps extends HTMLProps<HTMLTextAreaElement> {}

const FieldTextarea: FC<FieldTextareaProps> = ({
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
    <textarea
      className={c(
        [
          "h-36 inline-flex mb-2 items-center p-4 rounded-[30px] font-bold transition bg-gray-900 hover:bg-gray-700 shadow-md border-2 border-black focus:border-sky-500",
        ],
        [className]
      )}
      id={c([id])}
      name={c([name])}
      placeholder={c([placeholder])}
      {...rest}
    >
      {children}
    </textarea>
  );
};
export default FieldTextarea;
