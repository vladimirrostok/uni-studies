import { FC, HTMLProps } from "react";
import c from "clsx";

interface FieldFormProps extends HTMLProps<HTMLFormElement> {}

const FieldForm: FC<FieldFormProps> = ({ children, className, ...rest }) => {
  return (
    <form className={c(["form flex flex-col"], [className])} {...rest}>
      {children}
    </form>
  );
};

export default FieldForm;
