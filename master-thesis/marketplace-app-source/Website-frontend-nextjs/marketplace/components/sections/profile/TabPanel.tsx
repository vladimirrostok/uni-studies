import { FC } from "react";
import { Tab } from "@headlessui/react";
import NftList from "../nft/List";
import ProfileDescription from "./Description";
import CollectionListCreated from "../collection/ListCreated";
import FieldSwitch from "../../fields/Switch";
import Box from "../../containers/Box";
import { NFTStoryProps } from "../nft/Story";

const OPTIONS = [{ name: "For sale" }, { name: "Favourited" }];

type Props = {
  items?: typeof OPTIONS;
  owner?: boolean;
  bio: string;
  nftItems: NFTStoryProps[];
};

const ProfileTabPanels: FC<Props> = ({
  items = OPTIONS,
  bio,
  nftItems,
  owner,
}) => {
  return (
    <Tab.Panels className="profile_tabpanel w-full">
      <Tab.Panel className="flex flex-col">
        <Box className="flex-wrap items-center">
          {items.map((item) => (
            <FieldSwitch key={item.name} {...item} />
          ))}
          <select
            name="filters"
            id="nft-filters"
            className="ml-auto inline-flex bg-gray-900 hover:bg-gray-700 focus:bg-gray-700 items-center p-4 rounded-full font-bold transition shadow-md px-10 border-2 border-black focus:border-sky-500"
          >
            <option value="">{"Sort by"}</option>
            <option value="Newest">{"Newest"}</option>
            <option value="Oldest">{"Oldest"}</option>
            <option value="Lowest price">{"Lowest price"}</option>
            <option value="Highest price">{"Highest price"}</option>
          </select>
        </Box>
        <NftList nftItems={nftItems} owner={owner} />
      </Tab.Panel>
      <Tab.Panel className="profile_tabpanel w-full">
        <CollectionListCreated />
      </Tab.Panel>
      <Tab.Panel className="profile_tabpanel w-full">
        <ProfileDescription bio={bio} />
      </Tab.Panel>
      <Tab.Panel className="profile_tabpanel w-full">
        <p>Coming soon</p>
      </Tab.Panel>
    </Tab.Panels>
  );
};

export default ProfileTabPanels;
