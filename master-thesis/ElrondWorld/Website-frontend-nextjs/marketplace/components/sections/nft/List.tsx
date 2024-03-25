import { FC } from "react";
import Box from "../../containers/Box";
import NftStory, { NFTStoryProps } from "./Story";

export type NFTListProps = {
  owner?: boolean;
  nftItems: NFTStoryProps[];
};

const NftList: FC<NFTListProps> = ({ nftItems, owner }) => {
  return (
    <Box className="flex-wrap my-10 sm:-mx-2 w-full">
      {nftItems &&
        nftItems.map((item) => (
          <>
            <span className="sm:w-1/2 md:w-1/3 lg:w-1/4 xl:w-1/5">
              <NftStory
                owner={owner}
                image={item.image}
                title={item.title}
                collection={item.collection}
                identifier={item.identifier}
                nonce={item.nonce}
                listed_for_sale={item.listed_for_sale}
                mediaType={item.mediaType}
              />
            </span>
          </>
        ))}
    </Box>
  );
};

export default NftList;
