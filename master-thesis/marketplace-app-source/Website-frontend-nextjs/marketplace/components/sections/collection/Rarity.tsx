import { FC } from "react";
import Box from "../../containers/Box";
import NftListRarity, { NftListRarityProps } from "../nft/ListRarity";
import H2 from "../../fields/H2";
import CollectionModalFilters from "./ModalFilters";
import FieldInput from "../../fields/Input";
import { SearchIcon } from "@heroicons/react/outline";
import FieldSwitch from "../../fields/Switch";
import { NftStoryRarityProps } from "../nft/StoryRarity";

const OPTIONS = [{ name: "For sale" }];

type Props = {
  items?: typeof OPTIONS;
};

const CollectionRarity: FC<Props> = ({ items = OPTIONS }) => {
  let valueItems: NftStoryRarityProps[] = [
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
    {
      image:
        "https://gateway.pinata.cloud/ipfs/QmPGVLy1CpLgXUfcSGQGNVGALxuC1qRNNncrZTimM2jsJw",
      name: "Maiar Ghosts",
    },
  ];

  return (
    <Box className="relative flex-col">
      <Box className="flex-row items-center mb-4">
        <H2 className="mr-2 mb-0">666 Items</H2>
        {items.map((item) => (
          <FieldSwitch key={item.name} {...item} />
        ))}
        <Box className="flex-row items-center mx-auto relative">
          <SearchIcon className="absolute inset-y left-4 h-6 w-6 text-gray-400" />
          <FieldInput
            id="username"
            type="text"
            name="username"
            placeholder="Search"
            className="pl-12 mb-0"
            required
          ></FieldInput>
        </Box>
        <select
          name="filters"
          id="nft-filters"
          className="inline-flex bg-gray-900 hover:bg-gray-700 focus:bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md px-10 border-2 border-black focus:border-sky-500"
        >
          <option value="">{"Sort by"}</option>
          <option value="Newest">{"Newest"}</option>
          <option value="Oldest">{"Oldest"}</option>
          <option value="Lowest price">{"Lowest price"}</option>
          <option value="Highest price">{"Highest price"}</option>
        </select>
        <span className="relative">
          <CollectionModalFilters />
        </span>
      </Box>
      <NftListRarity values={valueItems} />
    </Box>
  );
};

export default CollectionRarity;
