// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";
import { useRef } from "react";
// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles

// Import Swiper modules
import { Autoplay, Navigation, Pagination, FreeMode } from "swiper/modules";

import { useContext } from "react";
import { ProductContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";
import "./Slider.css";

import Skeleton, { SkeletonTheme } from "react-loading-skeleton";

const Slider = (props) => {
  const { products } = useContext(ProductContext);
  const firstTenProducts = products.slice(0, 10);
  const swiperRef = useRef(null);

  // Ensure products are loaded

  if (!products || products.length === 0) {
    return (
      <SkeletonTheme baseColor="#202020" highlightColor="#444">
        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            overflowY: "auto",
            overflow: "hidden",
            gap: "30px",
          }}
        >
          {[...Array(4)].map((_, index) => (
            <div
              className="car-container"
              key={index}
              style={{
                display: "flex",
                alignItems: "center",
              }}
            >
              <Skeleton className="car-skeleton" />
            </div>
          ))}
        </div>
      </SkeletonTheme>
    );
  }

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={20}
      freeMode={true}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay, Navigation, Pagination, FreeMode]} // Register modules
      navigation={false} // Enable navigation arrows
      pagination={{ clickable: true }} // Enable pagination dots
      breakpoints={{
        320: { slidesPerView: 2 }, // 1 slide on small screens
        640: { slidesPerView: 3 }, // 2 slides on medium screens
        1024: { slidesPerView: 4 }, // 5 slides on large screens
      }}
    >
      {firstTenProducts.map((item) => (
        <SwiperSlide key={item.id}>
          <Link to={`/product/${item.id}`}>
            <img
              src={item.images[0]?.src}
              alt={item.name} // Add alt text
              onClick={props.slideClick}
              className="swip-img"
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
