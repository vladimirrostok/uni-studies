import * as React from "react";
import Box from "../containers/Box";
import H2 from "../fields/H2";

export interface ActionAreaCardProps {
  id: string;
  slug: string;
  author?: string;
  title: string;
  content: string;
  link?: string;
  thumbnail: string;
}

const ActionAreaCard: React.FC<ActionAreaCardProps> = ({
  slug,
  author,
  title,
  content,
  link,
  thumbnail,
}) => {
  return (
    <Box className="flex-col w-full mb-5">
      <a className="px-2" href={"/proposal/" + slug}>
        <Box className="flex-row">
          <Box className="max-h-[100px] min-w-[100px] bg-gray-900 justify-center md:mr-4 rounded-full overflow-hidden">
            <img
              className="object-cover min-w-full"
              src={thumbnail}
              alt="green iguana"
            />
          </Box>
          <Box className="flex-col">
            <H2>
              {title}
            </H2>
            <Box className="-mt-10 line-clamp-3 overflow-hidden">
              {content}
            </Box>
            <button className="text-sky-400 mt-auto text-left mx-2">
              Share
            </button>
          </Box>
        </Box>
      </a>
    </Box>
  );
};

export default ActionAreaCard;
