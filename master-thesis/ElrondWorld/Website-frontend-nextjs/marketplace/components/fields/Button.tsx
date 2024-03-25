import { FC, HTMLProps } from "react";
import c from "clsx";

interface SubmitButtonProps extends HTMLProps<HTMLAnchorElement> {
  variant?: string;
  disabled?: boolean;
}

const SubmitButton: FC<SubmitButtonProps> = ({
  children,
  variant,
  disabled,
  className,

  ...rest
}) => {
  return (
    <a
      className={c(
        ["hyperlink interactive-outline btn group"],
        [variant],
        [className] // TODO, keep base sizes consistent.
      )}
      {...rest}
    >
      <button disabled={disabled}>
        <span className="group-hover:bg-opacity-0">{children}</span>
      </button>
    </a>
  );
};

export default SubmitButton;
