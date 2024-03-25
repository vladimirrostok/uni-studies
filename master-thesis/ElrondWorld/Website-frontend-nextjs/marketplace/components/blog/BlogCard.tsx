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
    <Box className="flex-col w-full sm:w-1/2 lg:w-1/3 xl:w-1/4 mb-5">
      <a className="px-2" href={"/article/" + slug}>
        <Box className="flex-col">
          <Box className="h-40 bg-gray-900 justify-center">
            <img
              className="object-cover h-40 w-full"
              height="120"
              src={thumbnail}
              alt="green iguana"
            />
          </Box>
          <H2 className="mt-2">
            {title}
          </H2>
          <Box className="-mt-10 line-clamp-3 overflow-hidden">
            {content}
          </Box>
        </Box>
      </a>
      <button className="text-sky-400 mt-auto text-left mx-2">
        Share
      </button>
    </Box>
  );
};

export default ActionAreaCard;
