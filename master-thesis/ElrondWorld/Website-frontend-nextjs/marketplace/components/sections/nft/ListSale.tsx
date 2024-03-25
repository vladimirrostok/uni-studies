import { FC } from "react";
import Box from "../../containers/Box";
import NftStory from "./Story";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";
import { NFTListProps } from "./List";

const NftListSale: FC<NFTListProps> = ({ nftItems }) => {
  let items = [];

  if (nftItems) {
    for (var i = 0; i < nftItems.length; i++) {
      items.push(
        <>
          <SwiperSlide className="mb-5">
            <NftStory
              image={nftItems[i].image}
              title={"name"}
              collection={"collection"}
              identifier={null}
              nonce={null}
              mediaType={"image"}
            />
          </SwiperSlide>
        </>
      );
    }
  }

  return (
    <Box className="nft_list_sale flex-wrap my-10 -mx-2">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        loop={true}
        allowTouchMove={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 2,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 4,
          },
          // when window width is >= 1024px
          1280: {
            slidesPerView: 4,
          },
          // when window width is >= 1024px
          1536: {
            slidesPerView: 4,
          },
        }}
      >
        {items}
      </Swiper>
    </Box>
  );
};

export default NftListSale;
