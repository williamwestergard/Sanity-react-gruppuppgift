import { Swiper, SwiperSlide } from "swiper/react";
import { Link } from "react-router-dom";

import "swiper/css";
import "swiper/css/pagination";
import "swiper/css/navigation";

import "./swiperslider.css";

import { Autoplay, Pagination, Navigation } from "swiper/modules";

export default function App() {
  return (
    <>
      <Swiper
        slidesPerView={1}
        spaceBetween={30}
        autoplay={{
          delay: 3500,
          disableOnInteraction: true,
        }}
        speed={950}
        loop={true}
        pagination={{
          clickable: true,
        }}
        navigation={true}
        modules={[Autoplay, Pagination, Navigation]}
        className="mySwiper"
      >
        <SwiperSlide>Dino VS Dino!</SwiperSlide>
        <SwiperSlide>Time Periods</SwiperSlide>
        <SwiperSlide className="slide-3">
          <section className="slide-featured-dinos-container">
            <h2> Featured Dinosaurs </h2>
            <p>
              {" "}
              Don't know where to start?
              <br />
              We've picked the most famous dinosaurs for you. <br />
            </p>
            <br />
            <Link to="/featured-dinosaurs">
              <button>Discover </button>
            </Link>
          </section>
        </SwiperSlide>
      </Swiper>
    </>
  );
}
