import { FC, SVGProps } from "react";

const LogoEW: FC<SVGProps<SVGSVGElement>> = ({
  fill = "currentColor",
  width = 690,
  height = 690,
  ...props
}) => {
  return (
    <svg
      width={width}
      height={height}
      viewBox="0 0 690 690"
      fill="currentColor"
      xmlns="http://www.w3.org/2000/svg"
      {...props}
    >
      <defs>
        <linearGradient id="PSgrad_0" x1="0%" x2="100%" y1="0%" y2="0%">
          <stop offset="0%" stopColor="rgb(56,189,248)" stopOpacity="1" />
          <stop offset="100%" stopColor="rgb(217,70,239)" stopOpacity="1" />
        </linearGradient>
      </defs>
      <path
        fill="url(#PSgrad_0)"
        d="M609.960,112.795 C604.873,112.795 600.156,111.226 596.255,108.553 C596.461,108.771 596.670,108.986 596.876,109.204 L596.139,108.467 C593.743,106.805 591.661,104.725 590.0,102.328 L582.725,95.53 C585.32,97.232 587.322,99.440 589.583,101.693 C587.130,97.906 585.690,93.402 585.690,88.555 C585.690,75.168 596.556,64.315 609.960,64.315 C623.365,64.315 634.231,75.168 634.231,88.555 C634.231,101.942 623.365,112.795 609.960,112.795 ZM601.991,587.227 C615.378,587.227 626.231,598.94 626.231,611.498 C626.231,624.902 615.378,635.768 601.991,635.768 C588.604,635.768 577.751,624.902 577.751,611.498 C577.751,598.94 588.604,587.227 601.991,587.227 ZM552.517,103.699 C548.517,103.699 544.892,102.127 542.201,99.580 C427.474,7.980 263.609,8.144 149.66,100.91 L148.650,99.676 C145.961,102.225 142.339,103.798 138.341,103.798 C130.57,103.798 123.341,97.83 123.341,88.798 C123.341,82.660 127.33,77.390 132.314,75.68 C258.734,-24.887 438.948,-23.694 564.78,78.655 L563.854,78.879 C566.142,81.690 567.536,84.939 567.536,88.699 C567.536,96.983 560.812,103.699 552.517,103.699 ZM89.17,635.768 C75.613,635.768 64.747,624.916 64.747,611.528 C64.747,598.141 75.613,587.288 89.17,587.288 C102.421,587.288 113.287,598.141 113.287,611.528 C113.287,624.916 102.421,635.768 89.17,635.768 ZM81.918,112.659 C68.569,112.659 57.747,101.836 57.747,88.487 C57.747,75.137 68.569,64.315 81.918,64.315 C95.268,64.315 106.90,75.137 106.90,88.487 C106.90,101.836 95.268,112.659 81.918,112.659 ZM105.290,553.999 C105.290,562.284 98.574,568.999 90.290,568.999 C85.752,568.999 81.694,566.976 78.943,563.792 L78.650,564.85 C-21.271,441.922 -24.775,267.261 68.125,141.407 C69.142,138.767 70.881,136.493 73.105,134.818 C73.295,134.573 73.477,134.325 73.667,134.81 L73.859,134.273 C76.227,132.708 79.61,131.792 82.112,131.792 C90.396,131.792 97.112,138.508 97.112,146.792 C97.112,149.843 96.196,152.677 94.631,155.45 L95.69,155.483 C8.153,269.657 9.643,429.590 99.527,542.198 C103.30,544.944 105.290,549.203 105.290,553.999 ZM533.27,533.34 C502.807,563.254 426.745,538.756 345.969,478.146 C265.194,538.756 189.132,563.254 158.912,533.34 C128.692,502.814 153.190,426.753 213.801,345.978 C153.190,265.203 128.692,189.141 158.912,158.922 C189.132,128.702 265.194,153.199 345.969,213.810 C426.745,153.199 502.807,128.702 533.27,158.922 C563.247,189.141 538.749,265.203 478.138,345.978 C538.749,426.753 563.247,502.814 533.27,533.34 ZM437.759,345.974 C502.170,270.185 535.109,200.454 513.294,178.639 C491.478,156.823 421.747,189.762 345.957,254.173 C270.168,189.764 200.439,156.826 178.623,178.641 C156.808,200.456 189.746,270.186 254.156,345.974 C189.749,421.762 156.812,491.489 178.627,513.304 C200.442,535.118 270.170,502.182 345.957,437.775 C421.746,502.183 491.475,535.121 513.290,513.306 C535.105,491.491 502.168,421.762 437.759,345.974 ZM145.507,593.385 C149.199,593.385 152.574,594.724 155.187,596.936 L155.335,596.788 C267.597,682.332 424.161,682.358 536.456,596.871 L536.577,596.993 C539.222,594.655 542.688,593.225 546.495,593.225 C554.780,593.225 561.495,599.941 561.495,608.225 C561.495,612.33 560.65,615.498 557.728,618.143 L557.848,618.264 C557.597,618.460 557.342,618.647 557.91,618.842 C556.175,619.756 555.135,620.540 554.9,621.194 C431.503,714.39 261.175,714.190 138.514,621.650 C137.45,620.873 135.727,619.856 134.597,618.657 C134.384,618.492 134.168,618.333 133.956,618.167 L134.59,618.65 C131.847,615.451 130.507,612.76 130.507,608.385 C130.507,600.100 137.223,593.385 145.507,593.385 ZM609.753,132.89 C612.686,132.89 615.413,132.943 617.724,134.398 L618.161,133.960 C618.604,134.527 619.30,135.103 619.468,135.672 C621.115,137.75 622.448,138.829 623.365,140.816 C716.51,265.823 713.385,439.255 615.372,561.478 C612.769,565.926 607.955,568.922 602.430,568.922 C594.145,568.922 587.430,562.206 587.430,553.922 C587.430,549.661 589.214,545.824 592.67,543.94 L591.848,542.875 C682.301,430.192 683.936,269.773 596.758,155.364 L597.62,155.60 C595.607,152.748 594.753,150.21 594.753,147.89 C594.753,138.804 601.469,132.89 609.753,132.89 Z"
      />
    </svg>
  );
};

export default LogoEW;