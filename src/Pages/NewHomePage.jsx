import { useContext, useEffect, useState } from "react";
import { ProductContext } from "../Context/ShopContext";
import "../CSS/NewHomePage.css";
import { useNavigate } from "react-router-dom";
import "slick-carousel/slick/slick.css";
import "slick-carousel/slick/slick-theme.css";

import Carousel from "react-multi-carousel";
import "react-multi-carousel/lib/styles.css";

const NewHomePage = () => {
  const { category } = useContext(ProductContext);
  const [newCat, setNewCat] = useState([]);
  const [selectedCat, setSelectedCat] = useState("All");
  const [isDragging, setIsDragging] = useState(false);
  const [startX, setStartX] = useState(0);
  const navigate = useNavigate();

  const handleNavigation = (category) => {
    navigate(`/shopcategory/${category.toLowerCase().replace(/\s+/g, "-")}`);
  };

  const handleMouseDown = (e) => {
    setStartX(e.clientX);
    setIsDragging(false);
  };

  const handleMouseMove = (e) => {
    if (Math.abs(e.clientX - startX) > 5) {
      setIsDragging(true);
    }
  };

  const handlClick = (cat) => {
    if (!isDragging) {
      setSelectedCat(cat.name);
      handleNavigation(cat.name);
    }
  };

  const settings = {
    dots: true,
    infinite: false,
    speed: 500,
    slidesToShow: 15,
    swipeToSlide: true, // This allows the user to swipe and move slides smoothly
    arrows: true,
    draggable: true,
    slidesToScroll: 1,
  };

  const responsive = {
    desktop: {
      breakpoint: { max: 3000, min: 1024 },
      items: 10,
    },
    tablet: {
      breakpoint: { max: 1024, min: 464 },
      items: 8,
    },
    mobile: {
      breakpoint: { max: 464, min: 0 },
      items: 4,
    },
  };

  useEffect(() => {
    const savedCategory = localStorage.getItem("categories");
    if (savedCategory) {
      const parsedCategories = JSON.parse(savedCategory);
      const filteredCategories = parsedCategories.filter(
        (cat) => cat.name !== "Uncategorized"
      );
      setNewCat(filteredCategories);
    } else if (category && category.length > 0) {
      const filteredCategories = category.filter(
        (cat) => cat.name !== "Uncategorized"
      );
      setNewCat(filteredCategories);
    }
  }, []);

  return (
    <div style={{ marginTop: "16px" }}>
      {/* <div className="newhome-container">
        {newCat.map((cat) => (
          <div
            key={cat.name}
            onMouseDown={handleMouseDown}
            onMouseMove={handleMouseMove}
            className="list-container"
            onClick={() => {
              handlClick(cat);
            }}
          >
            <img
              className={`cat-img ${
                selectedCat === cat.name ? "selected" : ""
              }`}
              src={cat.image?.src}
            />
            {cat.name}
          </div>
        ))}
      </div>*/}

      <div>
        <Carousel
          responsive={responsive}
          swipeable={true}
          draggable={true}
          removeArrowOnDeviceType={["tablet", "mobile", "desktop"]}
        >
          {newCat.map((cat) => (
            <div
              key={cat.name}
              className="list-container"
              onMouseDown={handleMouseDown}
              onMouseMove={handleMouseMove}
              onClick={() => handlClick(cat)}
            >
              <img
                className={`cat-img ${
                  selectedCat === cat.name ? "selected" : ""
                }`}
                src={cat.image?.src}
              />
              <h3 style={{ margin: "0px" }}>{cat.name}</h3>
            </div>
          ))}
        </Carousel>
      </div>
    </div>
  );
};

export default NewHomePage;
