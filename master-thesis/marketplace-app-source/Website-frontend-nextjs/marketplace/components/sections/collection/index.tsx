import { FC } from "react";
import CollectionBanner from "./Banner";
import Article from "../../containers/Article";
import CollectionTabList from "../collection/TabList";
import CollectionTabPanels from "../collection/TabPanel";
import { Tab } from "@headlessui/react";
import FullWidth from "../../containers/FullWidth";

const Collection: FC = ({}) => {
  return (
    <Article className="collection flex-col">
      <CollectionBanner />
      <FullWidth className="md:-mt-10">
        <Tab.Group>
          <span className="w-screen md:w-full overflow-x-scroll -ml-2 lg:ml-0 px-2 lg:px-0">
            <CollectionTabList />
          </span>
          <CollectionTabPanels />
        </Tab.Group>
      </FullWidth>
    </Article>
  );
};

export default Collection;
