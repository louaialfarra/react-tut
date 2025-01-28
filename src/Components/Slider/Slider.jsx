// Import Swiper React components
import { Swiper, SwiperSlide } from "swiper/react";

// Import Swiper styles
import "swiper/css";
import "swiper/css/navigation"; // Navigation styles
import "swiper/css/pagination"; // Pagination styles

// Import Swiper modules
import { Autoplay, Navigation, Pagination } from "swiper/modules";

import { useContext } from "react";
import { ProductContext } from "../../Context/ShopContext";
import { Link } from "react-router-dom";

const Slider = (props) => {
  const { products } = useContext(ProductContext);

  return (
    <Swiper
      slidesPerView={5}
      spaceBetween={10}
      autoplay={{ delay: 3000, disableOnInteraction: false }}
      modules={[Autoplay, Navigation, Pagination]} // Register modules
      navigation // Enable navigation arrows
      pagination={{ clickable: true }} // Enable pagination dots
      breakpoints={{
        320: { slidesPerView: 1 }, // 1 slide on small screens
        640: { slidesPerView: 2 }, // 2 slides on medium screens
        1024: { slidesPerView: 5 }, // 5 slides on large screens
      }}
    >
      {products.map((item) => (
        <SwiperSlide key={item.id}>
          <Link to={`/product/${item.id}`}>
            <img
              src={item.images[0]?.src}
              alt={item.name} // Add alt text
              style={{ height: "450px", width: "300px", objectFit: "cover" }}
              onClick={props.slideClick}
            />
          </Link>
        </SwiperSlide>
      ))}
    </Swiper>
  );
};

export default Slider;
