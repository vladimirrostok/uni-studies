import { FC } from "react";
import Box from "../../containers/Box";
import FieldInput from "../../fields/Input";
import FieldLabel from "../../fields/Label";
import EGLD from "../../Icons/EGLD";
import FieldSubmit from "../../fields/Submit";
import CollectionMintData from "./data.json";

const CollectionMint: FC = ({}) => {
  const pageData = CollectionMintData["data"]["attributes"];

  return (
    <Box className="collection_mint justify-center items-center flex-col md:flex-row">
      <FieldLabel htmlFor="mint-number" className="md:mb-0">
        {"Number to mint"}
      </FieldLabel>
      <FieldInput
        className="w1/2 md:w-1/3 md:mb-0 mx-4"
        id="mint-number"
        type="text"
        name="Mint number"
        placeholder="1"
      ></FieldInput>
      <FieldLabel htmlFor="mint-number" className="md:mb-0 flex items-center">
        <EGLD className="w-5 h-5 mr-2" />
        {"0.666"}
      </FieldLabel>
      <FieldSubmit
        type="submit"
        className="md:mb-0 p-4 rounded-full font-bold transition btn_solid mx-4"
        value="Mint"
      ></FieldSubmit>
    </Box>
  );
};

export default CollectionMint;
