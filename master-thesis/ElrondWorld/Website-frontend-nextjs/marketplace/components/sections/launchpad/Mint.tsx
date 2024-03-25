import { FC } from "react";
import Box from "../../containers/Box";
import FieldInput from "../../fields/Input";
import FieldLabel from "../../fields/Label";
import EGLD from "../../Icons/EGLD";
import FieldSubmit from "../../fields/Submit";
import LaunchpadMintData from "./data.json";

const LaunchpadMint: FC = ({}) => {
  const pageData = LaunchpadMintData["data"]["attributes"];

  return (
    <Box className="launchpad_mint flex-col bg-gray-900 shadow-md rounded-lg md:ml-auto p-10 relative z-20">
      <FieldLabel htmlFor="mint-number" className="text-2xl mb-4 items-center mx-auto">
        {"Number to mint"}
      </FieldLabel>
      <FieldInput
        className="ring-2 ring-sky-500"
        id="mint-number"
        type="text"
        name="Mint number"
        placeholder="1"
      ></FieldInput>
      <FieldLabel
        htmlFor="mint-number"
        className="flex items-center mx-auto text-xl my-2"
      >
        <EGLD className="w-5 h-5 mr-2" />
        {"0.666"}
      </FieldLabel>
      <FieldSubmit
        type="submit"
        className="md:mb-0 p-4 rounded-full font-bold transition btn_solid mx-auto"
        value="Mint"
      ></FieldSubmit>
    </Box>
  );
};

export default LaunchpadMint;
