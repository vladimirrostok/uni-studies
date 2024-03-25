import { FC } from "react";

import HeroIntroData from "./data.json";
import H1 from "../../fields/H1";
import Description from "../../fields/Description";
import Hyperlink from "../../fields/Hyperlink";

const HeroIntro: FC = ({}) => {
  const pageData = HeroIntroData["data"]["attributes"];

  return (
    <>
      <H1 className="xl:text-5xl mt-5 leading-tight text-center md:text-left sm:-mt-5 text-transparent bg-clip-text bg-gradient-to-r from-sky-400 to-fuchsia-500">
        {pageData.headline}
      </H1>
      <h2>
        <Description className="text-xl xl:text-2xl">
          {pageData.description}
        </Description>
      </h2>
      <div className="flex flex-row justify-center lg:justify-start w-full">
        <Hyperlink href="/createnfts" className="btn_outline mr-5">
          {"Create"}
        </Hyperlink>
        <Hyperlink href="/explore/nft-listed" className="btn_solid">
          {"Trade"}
        </Hyperlink>
      </div>
    </>
  );
};

export default HeroIntro;
