import { FC } from "react";
import Box from "../../containers/Box";
import H3 from "../../fields/H3";
import RarityValueBox, { RarityValueBoxProps } from "./RarityValueBox";

export interface NftPropertiesProps {
  values: RarityValueBoxProps[];
  nftRank: string;
}

const NftProperties: FC<NftPropertiesProps> = ({ values, nftRank }) => {
  let items = [];

  for (var i = 0; i < values.length; i++) {
    items.push(
      <RarityValueBox
        nftPropertyName={values[i].nftPropertyName}
        nftPropertyValue={values[i].nftPropertyValue}
        nftRarity={values[i].nftRarity}
      />
    );
  }

  return (
    <Box className="flex-col mb-4">
      <H3 className="text-sky-500 text-xl">{"Properties"}</H3>
      <span className="text-violet-200 whitespace-nowrap -mt-5 mb-3">
        {nftRank}
      </span>
      <Box className="flex-wrap items-stretch -mx-1">{items}</Box>
    </Box>
  );
};

export default NftProperties;
