import React, { useState } from "react";
import { Swiper, SwiperSlide } from "swiper/react";
import { Navigation, Pagination, Scrollbar, A11y } from "swiper/modules";

import "swiper/css";
import "swiper/css/navigation";
import "swiper/css/pagination";
import "swiper/css/scrollbar";
import BookCard from "./BookCard";

export default function BookSlider({ books }) {
  return (
    <div>
      <Swiper
        modules={[Navigation, Pagination, Scrollbar, A11y]}
        spaceBetween={10}
        navigation
        grabCursor={true}
        className="mySwiper"
        breakpoints={{
          0: {
            slidesPerView: 1,
            spaceBetween: 10,
          },
          360: {
            slidesPerView: 2,
            spaceBetween: 5,
          },
          768: {
            slidesPerView: 3,
            spaceBetween: 5,
          },
          1024: {
            slidesPerView: 4,
            spaceBetween: 10,
          },
          1280: {
            slidesPerView: 5,
            spaceBetween: 20,
          },
        }}
      >
        {books.map((book) => (
          <SwiperSlide key={book.id}>
            <BookCard book={book} />
          </SwiperSlide>
        ))}
      </Swiper>
    </div>
  );
}
