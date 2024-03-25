import { FC } from "react";

import Image from "next/image";
import Link from "next/link";

import Box from "../../containers/Box";
import H3 from "../../fields/H3";

import CollectionHeroData from "./data.json";
import CollectionAuthor from "./Author";
import ProfileImage from "../profile/Pic";
import { Autoplay, EffectFade, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const CollectionHero: FC = ({}) => {
  const pageData = CollectionHeroData["data"]["attributes"];

  return (
    <Swiper
      // install Swiper modules
      modules={[Scrollbar, Autoplay, EffectFade]}
      autoplay={{ delay: 3000 }}
      effect="fade"
      scrollbar={{ draggable: true }}
      fadeEffect={{
        crossFade: true, // enables slides to cross fade
      }}
    >
      <SwiperSlide className="">
        <Link href="/nft">
          <a className="collection_hero block">
            <Box className="flex-col bg-gray-900 shadow-md rounded-lg overflow-hidden">
              <Box className="w-full">
                <Image
                  src={pageData.avatar}
                  alt={pageData.name}
                  width="1000"
                  height="500"
                  className="object-cover"
                />
              </Box>
            </Box>
          </a>
        </Link>
      </SwiperSlide>
      <SwiperSlide className="">
        <Link href="/nft">
          <a className="collection_hero block">
            <Box className="flex-col bg-gray-900 shadow-md rounded-lg overflow-hidden">
              <Box className="w-full">
                <Image
                  src="https://gateway.pinata.cloud/ipfs/QmaAkXEv6DkJ8XRHVihfwVJbFN3AAfXtuFpi2WL96WpSnp"
                  alt={pageData.name}
                  width="1000"
                  height="500"
                  className="object-cover"
                />
              </Box>
            </Box>
          </a>
        </Link>
      </SwiperSlide>
    </Swiper>
  );
};

export default CollectionHero;
