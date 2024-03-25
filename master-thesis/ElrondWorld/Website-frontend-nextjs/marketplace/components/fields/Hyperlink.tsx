import { FC, HTMLProps } from "react";
import c from "clsx";
import Link from "next/link";

interface HyperlinkProps extends HTMLProps<HTMLAnchorElement> {
  variant?: "cta1" | "cta2" | "navBarDropdownText";
}

const Hyperlink: FC<HyperlinkProps> = ({
  children,
  variant = "navBarDropdownText",
  className,
  href,
  ...rest
}) => {
  return (
    <Link href={href || "/"}>
      <a
        className={c(
          ["hyperlink interactive-outline btn group"],
          [variant],
          [className]
        )}
        {...rest}
      >
        <span className="group-hover:bg-opacity-0">{children}</span>
      </a>
    </Link>
  );
};

export default Hyperlink;
