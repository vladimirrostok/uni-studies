import { FC } from "react";
import Box from "../../containers/Box";
import NftCollection from "./Collection";
import CollectionAuthor from "../collection/Author";
import NftPrice, { NftPriceProps } from "./Price";
import NftProperties from "./Properties";
import NftHeadline, { NftHeadlineProps } from "./Headline";
import NftActivity from "./Activity";
import NftMedia, { NftMediaProps } from "./Media";
import NftDetails from "./Details";
import NftTags from "./Tags";
import { RarityValueBoxProps } from "./RarityValueBox";
import { ActivityValueBoxProps } from "./ActivityValueBox";
import {
  BookmarkIcon,
  HandIcon,
  ShoppingCartIcon,
  SwitchHorizontalIcon,
} from "@heroicons/react/solid";

export interface NftTopProps {
  NftPricePropsValues: NftPriceProps;
  NftHeadlinePropsValues: NftHeadlineProps;
  NftMediaPropsValues: NftMediaProps;
}

const NftTop: FC<NftTopProps> = ({
  NftPricePropsValues,
  NftHeadlinePropsValues,
  NftMediaPropsValues,
}) => {
  let propertiesItems: RarityValueBoxProps[] = [
    {
      nftPropertyName: "Background",
      nftPropertyValue: "#035",
      nftRarity: 0.35,
    },
    {
      nftPropertyName: "Body",
      nftPropertyValue: "Mr Ghost",
      nftRarity: 1.2,
    },
    {
      nftPropertyName: "Cloud",
      nftPropertyValue: "210",
      nftRarity: 0.8,
    },
    {
      nftPropertyName: "Decoration",
      nftPropertyValue: "035",
      nftRarity: 3.5,
    },
    {
      nftPropertyName: "Hat",
      nftPropertyValue: "Helmet",
      nftRarity: 0.5,
    },
    {
      nftPropertyName: "Jewel",
      nftPropertyValue: "Red Glasses",
      nftRarity: 2,
    },
    {
      nftPropertyName: "Tool",
      nftPropertyValue: "Beer",
      nftRarity: 1.5,
    },
    {
      nftPropertyName: "Transport",
      nftPropertyValue: "Skate",
      nftRarity: 0.5,
    },
  ];

  let activitiesItems: ActivityValueBoxProps[] = [
    {
      action: "Listed",
      herotag: "@gokai",
      icon: <BookmarkIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Transfer",
      herotag: "@gokai",
      icon: <SwitchHorizontalIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Transfer",
      herotag: "@gokai",
      icon: <SwitchHorizontalIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Sale",
      herotag: "@gokai",
      icon: <ShoppingCartIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Offer",
      herotag: "@gokai",
      icon: <HandIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Listed",
      herotag: "@gokai",
      icon: <BookmarkIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Transfer",
      herotag: "@gokai",
      icon: <SwitchHorizontalIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Sale",
      herotag: "@gokai",
      icon: <ShoppingCartIcon />,
      time: "5m ago",
      value: 0.0666,
    },
    {
      action: "Offer",
      herotag: "@gokai",
      icon: <HandIcon />,
      time: "5m ago",
      value: 0.0666,
    },
  ];

  return (
    <Box className="nft_top relative items-start flex-col lg:flex-row mb-10">
      <span className="block lg:hidden">
        <NftHeadline
          name={NftHeadlinePropsValues.name}
          favorites={NftHeadlinePropsValues.favorites}
          views={NftHeadlinePropsValues.views}
        />
      </span>
      <Box className="flex-col lg:sticky top-32 w-full lg:w-4/12 xl:w-5/12 lg:mr-10">
        <Box className="flex-col bg-gray-900 shadow-md rounded-lg overflow-hidden mb-5">
          <NftMedia image={NftMediaPropsValues.image} name={"Mr Ghost #001"} />
          <Box className="flex-row my-5 px-5">
            <NftCollection title={""} />
          </Box>
        </Box>
        <span className="hidden lg:block">
          <Box className="flex-col mb-5 bg-gray-900 shadow-md rounded-lg px-5">
            <Box className="flex-row my-5">
              <CollectionAuthor author={"Gokai Labs"} />
            </Box>
          </Box>
          <NftDetails
            mintedBy={"erd1jf...rfkji3"}
            ownedBy={"erd1jf...rfkji3"}
            royalties={10}
            token={"MRG-47r7f7-r7d"}
          />
        </span>
      </Box>
      <Box className="flex-col lg:w-8/12 xl:w-7/12">
        <span className="hidden lg:block">
          <NftHeadline
            name={NftHeadlinePropsValues.name}
            favorites={NftHeadlinePropsValues.favorites}
            views={NftHeadlinePropsValues.views}
          />
        </span>
        <NftPrice
          amount={NftPricePropsValues.amount}
          amountInUSD={NftPricePropsValues.amountInUSD}
          saleEnds={NftPricePropsValues.saleEnds}
        />
        <NftProperties nftRank={"#1"} values={propertiesItems} />
        <NftTags tagNames={["Pixel Art", "NFT", "Mr Ghost"]} />
        <NftActivity values={activitiesItems} />
        <span className="block lg:hidden">
          <Box className="flex-col mb-5 bg-gray-900 shadow-md rounded-lg px-5">
            <Box className="flex-row my-5">
              <CollectionAuthor author={"Gokai Labs"} />
            </Box>
          </Box>
          <NftDetails
            mintedBy={"erd1jf...rfkji3"}
            ownedBy={"erd1jf...rfkji3"}
            royalties={10}
            token={"MRG-47r7f7-r7d"}
          />
        </span>
      </Box>
    </Box>
  );
};

export default NftTop;
