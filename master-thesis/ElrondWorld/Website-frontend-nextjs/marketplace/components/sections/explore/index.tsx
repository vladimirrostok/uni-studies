import { FC } from "react";
import Section from "../../containers/Section";
import Box from "../../containers/Box";
import ExploreTabList from "./TabList";
import ExploreTabPanels from "./TabPanel";
import { Tab } from "@headlessui/react";
import ExploreData from "./data.json";

const Explore: FC = ({}) => {
  const pageData = ExploreData["data"]["attributes"];

  return (
    <Section className="explorer">
      <Box className="flex-col text-center mx-auto">
        <Tab.Group>
          <span className="w-screen md:w-full overflow-x-scroll -ml-2 lg:ml-0 px-2 lg:px-0">
            <ExploreTabList />
          </span>
          <ExploreTabPanels />
        </Tab.Group>
      </Box>
    </Section>
  );
};

export default Explore;
