import { FC } from "react";
import Image from "next/image";
import Link from "next/link";
import Box from "../../containers/Box";
import Article from "../../containers/Article";
import H3 from "../../fields/H3";

export interface NftStoryRarityProps {
  image: string;
  name: string;
}

const NftStoryRarity: FC<NftStoryRarityProps> = ({ image, name }) => {
  return (
    <Link href="/nft">
      <a className="nft_story block mb-3 sm:mx-2">
        <div className="hover:rounded-2xl hover:border-0.25 hover:shadow-md hover:shadow-sky-500/50 hover:bg-gradient-to-r from-sky-400 to-fuchsia-500 overflow-hidden p-0.5">
          <Article className="flex-col bg-gray-900  rounded-2xl overflow-hidden">
            <Image
              unoptimized
              src={image}
              alt={name}
              width="512"
              height="512"
              className="object-contain hover:animate-pulse"
            />
            <Box className="flex-row mt-5 px-3">
              <Box className="flex-row w-full ">
                <span className="font-bold text-lg text-sky-400 mr-auto">
                  {"Rank 1"}
                </span>
                <H3 className="text-lg text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
                  {name}
                </H3>
              </Box>
            </Box>
          </Article>
        </div>
      </a>
    </Link>
  );
};

export default NftStoryRarity;
