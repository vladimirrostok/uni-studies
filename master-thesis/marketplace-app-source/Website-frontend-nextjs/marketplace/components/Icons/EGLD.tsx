import { FC, SVGProps } from "react";

const EGLD: FC<SVGProps<SVGSVGElement>> = ({
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
      <g fill="currentColor" fillRule="evenodd">
        <path d="M30.93 7.908a.737.737 0 0 1-.205-.503.707.707 0 0 1 1.206-.504c.141.142.213.32.213.504a.717.717 0 0 1-.71.71.713.713 0 0 1-.503-.207m-2.008 2.008a.74.74 0 0 1-.206-.504c0-.184.071-.361.206-.503a.715.715 0 0 1 1.007 0c.135.142.206.32.206.503 0 .178-.07.362-.206.504a.725.725 0 0 1-.503.206.725.725 0 0 1-.504-.206m-2.007 2a.71.71 0 1 1 1.007 0 .704.704 0 0 1-1.007 0m-2.008 2.008a.713.713 0 0 1 0-1 .716.716 0 0 1 1.007 0 .71.71 0 0 1 0 1 .696.696 0 0 1-.503.206.708.708 0 0 1-.504-.206m-2 2.008a.694.694 0 0 1 0-1 .693.693 0 0 1 1 0 .68.68 0 0 1 .205.496.685.685 0 0 1-.205.504.684.684 0 0 1-.504.205.68.68 0 0 1-.497-.205m-2.22 1.504c0-.178.072-.363.213-.504a.706.706 0 0 1 1.206.504.696.696 0 0 1-.206.503.713.713 0 0 1-1.213-.503zm-1.794 2.51a.697.697 0 0 1-.206-.503.705.705 0 1 1 1.411 0 .697.697 0 0 1-.205.504.71.71 0 0 1-1 0m-2.008 2a.71.71 0 0 1 0-1 .707.707 0 0 1 1 0c.142.141.213.318.213.503a.687.687 0 0 1-.213.497.685.685 0 0 1-.496.212.7.7 0 0 1-.504-.212m-2.007 2.007a.709.709 0 1 1 1.007 0 .703.703 0 0 1-1.007 0m-2.008 2.007a.707.707 0 0 1 0-1 .715.715 0 0 1 1.008 0 .71.71 0 0 1 0 1 .695.695 0 0 1-.504.207.695.695 0 0 1-.504-.207m-2 2.008a.692.692 0 0 1-.213-.504c0-.177.071-.36.213-.503a.72.72 0 0 1 1 0 .739.739 0 0 1 .206.503.713.713 0 0 1-.206.504.697.697 0 0 1-.504.206.681.681 0 0 1-.496-.206m-2.008 2.008a.693.693 0 0 1-.212-.504c0-.177.07-.362.212-.504a.72.72 0 0 1 1 0 .708.708 0 0 1 .207.504.686.686 0 0 1-.206.504.714.714 0 0 1-1 0m-2.008 2.007a.696.696 0 0 1-.206-.503.706.706 0 0 1 1.206-.504.704.704 0 0 1 0 1.007.712.712 0 0 1-1 0"></path>
        <path d="M7.862 7.908a.737.737 0 0 0 .206-.503.707.707 0 0 0-1.206-.504.706.706 0 0 0-.213.504.717.717 0 0 0 .71.71c.184 0 .369-.071.503-.207M9.87 9.916a.74.74 0 0 0 .205-.504.727.727 0 0 0-.205-.503.715.715 0 0 0-1.007 0 .726.726 0 0 0-.206.503c0 .178.07.362.206.504.142.135.319.206.503.206s.362-.07.504-.206m2.007 2a.71.71 0 1 0-1.007 0 .704.704 0 0 0 1.007 0m2.008 2.008a.713.713 0 0 0 0-1 .716.716 0 0 0-1.007 0 .71.71 0 0 0 0 1c.142.142.319.206.503.206a.708.708 0 0 0 .504-.206m2 2.008a.694.694 0 0 0 0-1 .693.693 0 0 0-1 0 .68.68 0 0 0-.206.496c0 .184.064.369.206.504.135.142.32.205.504.205a.68.68 0 0 0 .496-.205m2.22 1.504a.718.718 0 0 0-.212-.504.706.706 0 0 0-1.206.504c0 .184.064.361.206.503a.713.713 0 0 0 1.213-.503zm1.795 2.51a.697.697 0 0 0 .206-.503.705.705 0 1 0-1.411 0c0 .184.063.362.205.504a.71.71 0 0 0 1 0m2.007 2a.71.71 0 0 0 0-1 .707.707 0 0 0-1 0 .704.704 0 0 0-.213.503c0 .177.072.362.214.497a.685.685 0 0 0 .496.212.7.7 0 0 0 .503-.212m2.008 2.007a.709.709 0 1 0-1.008 0 .703.703 0 0 0 1.007 0m2.008 2.007a.707.707 0 0 0 0-1 .715.715 0 0 0-1.007 0 .71.71 0 0 0 0 1c.142.143.32.207.504.207a.695.695 0 0 0 .503-.207m2 2.008a.692.692 0 0 0 .213-.504.716.716 0 0 0-.212-.503.72.72 0 0 0-1 0 .739.739 0 0 0-.206.503c0 .185.07.37.206.504.142.142.32.206.503.206a.681.681 0 0 0 .497-.206m2.007 2.008a.693.693 0 0 0 .213-.504.716.716 0 0 0-.213-.504.72.72 0 0 0-1 0 .708.708 0 0 0-.206.504c0 .184.064.369.206.504a.714.714 0 0 0 1 0m2.008 2.007a.696.696 0 0 0 .206-.503.706.706 0 0 0-1.206-.504.704.704 0 0 0 0 1.007.712.712 0 0 0 1 0M12.634 8.452L8.326 4.143C11.655 1.58 15.334.295 19.363.291c4.008-.004 7.69 1.284 11.045 3.86l-4.316 4.315c-2.06-1.34-4.304-2.01-6.733-2.005-2.46.005-4.7.671-6.725 1.99zM8.387 26.17l-4.305 4.305C1.54 27.142.267 23.463.272 19.435c.003-4.065 1.27-7.745 3.798-11.04L8.373 12.7c-1.35 2.042-2.03 4.286-2.035 6.733-.004 2.415.681 4.66 2.05 6.739zm17.74 4.282l4.291 4.291c-3.288 2.534-6.951 3.817-10.989 3.849-4.077.032-7.782-1.25-11.115-3.84l4.285-4.286c2.064 1.403 4.332 2.1 6.805 2.083 2.435-.017 4.675-.718 6.723-2.097zm4.243-17.756l4.31-4.311c2.592 3.332 3.873 7.037 3.841 11.115-.032 4.021-1.317 7.682-3.854 10.984l-4.306-4.306c1.329-2.02 2.01-4.227 2.04-6.625.029-2.486-.65-4.771-2.031-6.857zM34.843 31.836a2.994 2.994 0 1 1 0 5.989 2.994 2.994 0 0 1 0-5.989M3.986 31.842a2.994 2.994 0 1 1 0 5.989 2.994 2.994 0 0 1 0-5.989M34.871.957a2.994 2.994 0 1 1 0 5.988 2.994 2.994 0 0 1 0-5.988M3.91.904a2.994 2.994 0 1 1 0 5.988 2.994 2.994 0 0 1 0-5.988"></path>
      </g>
    </svg>
  );
};

export default EGLD;