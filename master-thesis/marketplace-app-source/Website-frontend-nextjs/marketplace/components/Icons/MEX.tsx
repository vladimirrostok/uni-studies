import { FC, SVGProps } from "react";

const MEX: FC<SVGProps<SVGSVGElement>> = ({
  fill = "currentColor",
  width = 40,
  height = 40,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 40 40"
      fill="none"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient
          id="linear-gradient-symbol"
          x1="0.5"
          x2="0.5"
          y2="1"
          gradientUnits="objectBoundingBox"
          className="primary-highlight"
        >
          <stop offset="0" stopColor="currentColor"></stop>
          <stop offset="1" stopColor="currentColor"></stop>
        </linearGradient>
      </defs>
      <g id="Group_1331" transform="translate(-47.168 -21.519)">
        <g id="Group_1321" transform="translate(-247.872 -130.693)">
          <path
            id="Path_1838"
            d="M355.676,152.213l-3.832,17.8h-9.661Z"
            transform="translate(-40.089 0)"
            fillRule="evenodd"
            fill="url(#linear-gradient-symbol)"
          ></path>
          <path
            id="Path_1839"
            d="M326.45,271.184l-7.053,9.379H295.04l7.054-9.379Z"
            transform="translate(0 -101.17)"
            fillRule="evenodd"
            fill="url(#linear-gradient-symbol)"
          ></path>
          <path
            id="Path_1840"
            d="M381.139,333.864l-13.493,17.8,3.832-17.8Z"
            transform="translate(-61.742 -154.472)"
            fillRule="evenodd"
            fill="url(#linear-gradient-symbol)"
          ></path>
        </g>
      </g>
    </svg>
  );
};

export default MEX;
