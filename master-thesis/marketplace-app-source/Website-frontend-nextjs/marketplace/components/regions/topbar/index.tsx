import { FC } from "react";
import Box from "../../containers/Box";

const IndexTopbar: FC = () => {
  return (
    <Box className="flex-row items-center py-2 hidden lg:flex">
      <Box className="flex-row mx-4">
        <Box className="text-gray-400 mr-2">Volume 24h: </Box>
        <Box className="text-sky-400">171 982 EGLD</Box>
      </Box>
      <Box className="flex-row mx-4">
        <Box className="text-gray-400 mr-2">Volume total: </Box>
        <Box className="text-sky-400">15 469 492 EGLD</Box>
      </Box>
      <Box className="flex-row mx-4">
        <Box className="text-gray-400 mr-2">EGLD/USD</Box>
        <Box className="text-sky-400">$49.30</Box>
      </Box>
    </Box>
  );
};

export default IndexTopbar;
