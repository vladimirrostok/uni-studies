import { FC } from "react";
import Box from "../../containers/Box";
import NftStoryRarity, { NftStoryRarityProps } from "./StoryRarity";

export class NftListRarityProps {
  values: NftStoryRarityProps[];
}

const NftListRarity: FC<NftListRarityProps> = ({ values }) => {
  let valueItems = [];

  for (var i = 0; i < values.length; i++) {
    valueItems.push(
      <span className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
        <NftStoryRarity image={values[i].image} name={values[i].name} />
      </span>
    );
  }

  return <Box className="flex-wrap">{valueItems}</Box>;
};

export default NftListRarity;
