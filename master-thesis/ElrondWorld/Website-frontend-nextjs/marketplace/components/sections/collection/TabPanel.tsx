import { FC } from "react";
import { Tab } from "@headlessui/react";
import CollectionTabPanelsData from "./data.json";
import CollectionActivity from "./Activity";
import CollectionRarity from "./Rarity";

const CollectionTabPanels: FC = ({}) => {
  const pageData = CollectionTabPanelsData["data"]["attributes"];

  return (
    <Tab.Panels className="explore_tabpanel">
      <Tab.Panel>
        <CollectionRarity />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionActivity />
      </Tab.Panel>
    </Tab.Panels>
  );
};

export default CollectionTabPanels;
