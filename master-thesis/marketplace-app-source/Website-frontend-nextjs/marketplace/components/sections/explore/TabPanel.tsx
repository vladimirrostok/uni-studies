import { FC } from "react";

import { Tab } from "@headlessui/react";

import ExploreTabPanelsData from "./data.json";
import CollectionList from "../collection/List";

const ExploreTabPanels: FC = ({}) => {
  const pageData = ExploreTabPanelsData["data"]["attributes"];

  return (
    <Tab.Panels className="explore_tabpanel">
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
      <Tab.Panel>
        <CollectionList />
      </Tab.Panel>
    </Tab.Panels>
  );
};

export default ExploreTabPanels;
