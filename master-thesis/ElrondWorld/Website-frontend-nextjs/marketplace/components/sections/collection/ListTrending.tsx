import { FC } from "react";
import Box from "../../containers/Box";
import CollectionStoryTrending from "../collection/StoryTrending";
import { A11y, Navigation, Pagination, Scrollbar } from "swiper";
import { Swiper, SwiperSlide } from "swiper/react";

const CollectionListTrending: FC = ({}) => {
  return (
    <Box className="trending_list flex-wrap">
      <Swiper
        // install Swiper modules
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={0}
        navigation
        pagination={{ clickable: true }}
        loop={false}
        allowTouchMove={true}
        breakpoints={{
          // when window width is >= 640px
          640: {
            slidesPerView: 1,
          },
          // when window width is >= 768px
          768: {
            slidesPerView: 2,
          },
          // when window width is >= 1024px
          1024: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1280: {
            slidesPerView: 3,
          },
          // when window width is >= 1024px
          1536: {
            slidesPerView: 5,
          },
        }}
      >
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
        <SwiperSlide className="md:w-1/2 lg:w-1/3">
          <CollectionStoryTrending />
        </SwiperSlide>
      </Swiper>
    </Box>
  );
};

export default CollectionListTrending;
