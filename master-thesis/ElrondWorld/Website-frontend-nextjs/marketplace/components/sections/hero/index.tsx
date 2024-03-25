import { FC } from "react";

import Section from "../../containers/Section";
import Box from "../../containers/Box";
import Collectionhero from "../collection/Hero";
import HeroIntro from "./Intro";

import heroData from "./data.json";

import { SectionHero } from "../../../lib/model";
import { getSectionHero } from "../../../lib/section-hero";

interface HeroProps {
  pageData: SectionHero;
}

const Hero: FC = ({}) => {
  const pageData = heroData["data"]["attributes"];

  return (
    <Section className="hero pt-10 mb-10 lg:pt-0 lg:px-0 flex flex-col lg:flex-row items-center self-stretch">
      <Box className="hero_intro items-center flex-col lg:w-6/12 xl:w-4/12 lg:pr-12 xl:pr-20 -mt-5 sm:mt-0 lg:mr-auto text-center lg:text-left mb-20 lg:mb-0">
        <HeroIntro />
      </Box>
      <Box className="hero_collection w-full lg:w-6/12 xl:w-8/12">
        <Collectionhero />
      </Box>
    </Section>
  );
};

export default Hero;

export async function getStaticProps(): Promise<{ props: HeroProps }> {
  const pageData = await getSectionHero();

  return {
    props: {
      pageData: pageData["data"]["attributes"],
    },
  };
}
