import React, { FC } from "react";
import Box from "../../containers/Box";
import { BookmarkIcon } from "@heroicons/react/solid";
import EGLD from "../../Icons/EGLD";

export interface ActivityValueBoxProps {
  icon: React.ReactElement;
  action: string;
  value: number;
  herotag: string;
  time: string;
}

const ActivityValueBox: FC<ActivityValueBoxProps> = ({
  icon,
  action,
  value,
  herotag,
  time,
}) => {
  return (
    <Box className="flex-row w-full p-5 items-center hover:bg-gray-800 border-b border-black">
      <Box className="flex-col sm:flex-row flex-1">
        <Box className="flex-1 flex-row text-sky-500">
          <div className="h-6 w-6 mr-2">{icon}</div>
          {action}
        </Box>
        <span className="ml-1 sm:ml-0 mt-2 sm:mt-0 flex-1">
          <Box className="flex-col">
            <Box className="flex-row items-center">
              <EGLD className="h-4 w-4 mr-2" />
              {value}
            </Box>
          </Box>
        </span>
      </Box>
      <Box className="flex-col sm:flex-row flex-1 items-end">
        <Box className="flex-1 flew-row">
          <span className="text-center mr-2 ">By</span>
          <span className="text-sky-500 text-center font-bold">{herotag}</span>
        </Box>
        <span className="flex-1 text-violet-300 text-center">{time}</span>
      </Box>
    </Box>
  );
};

export default ActivityValueBox;
