import { FC } from "react";

import Section from "../../containers/Section";
import heroData from "./data.json";
import H2 from "../../fields/H2";
import CollectionListTrending from "../collection/ListTrending";

const Trending: FC = ({}) => {
  const pageData = heroData["data"]["attributes"];

  return (
    <Section className="trending flex flex-col py-0 sm:py-10">
      <H2 className="text-4xl font-feature sm:hidden text-center mx-auto justify-center text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        {pageData.headlineMobile}
      </H2>
      <H2 className="hidden sm:block font-feature sm:text-4xl lg:leading-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        {pageData.headlineFull}
      </H2>
      <CollectionListTrending />
      <H2 className="mt-5 hidden sm:block font-feature sm:text-4xl lg:leading-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        {pageData.headline02}
      </H2>
      <CollectionListTrending />
      <H2 className="mt-5 hidden sm:block font-feature sm:text-4xl lg:leading-16 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        {pageData.headline03}
      </H2>
      <CollectionListTrending />
    </Section>
  );
};

export default Trending;
