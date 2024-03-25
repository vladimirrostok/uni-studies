import { FC } from "react";
import Box from "../../containers/Box";
import H3 from "../../fields/H3";
import TagNameBox from "./TagNameBox";
import RarityValueBox from "./RarityValueBox";

export interface NftTagsProps {
  tagNames: string[];
}

const NftTags: FC<NftTagsProps> = ({ tagNames }) => {
  let items = [];

  for (var i = 0; i < tagNames.length; i++) {
    items.push(<TagNameBox tagName={tagNames[i]} />);
  }

  return (
    <Box className="flex-col mb-5">
      <H3 className="text-sky-500 text-lg">{"Tags"}</H3>
      <Box className="flex-wrap">{items}</Box>
    </Box>
  );
};

export default NftTags;
