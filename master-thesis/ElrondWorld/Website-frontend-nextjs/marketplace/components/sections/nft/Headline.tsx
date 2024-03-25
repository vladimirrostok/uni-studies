import { FC } from "react";
import Box from "../../containers/Box";
import H1 from "../../fields/H1";
import { EyeIcon, HeartIcon } from "@heroicons/react/outline";

export interface NftHeadlineProps {
  name: string;
  views: string;
  favorites: string;
}

const NftHeadline: FC<NftHeadlineProps> = ({ name, views, favorites }) => {
  return (
    <Box className="flex-col">
      <Box className="flex-col items-start mb-2">
        <H1 className="justify-start mr-4 mb-2 pb-2">{name}</H1>
        <Box className="flex-row">
          <Box className="flex-row font-bold text-gray-400 -mt-2 mr-5">
            <EyeIcon className="h-6 w-6 mr-2" />
            {views}
          </Box>
          <Box className="flex-row font-bold text-gray-400 -mt-2">
            <HeartIcon className="h-6 w-6 mr-2" />
            {favorites}
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default NftHeadline;
