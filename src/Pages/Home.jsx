import { useContext, useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import axios from "axios";
import { useState } from "react";
import Item from "../Components/Item/Item";
import { ProductContext } from "../Context/ShopContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Item2 from "../Components/Item/Item2";
import FilterComponent from "../Components/Filter/Filter";
import "../CSS/Home.css";
import { Carousel } from "react-responsive-carousel";
import "react-responsive-carousel/lib/styles/carousel.min.css"; // requires a loader
import useMediaQuery from "@mui/material/useMediaQuery";

import FilterPopup from "../Components/FilterPopup/FilterPopup";

import car1 from "../assets/carImages/car1.jpg";
import car2 from "../assets/carImages/car2.jpg";
import { useNavigate } from "react-router-dom";

import FilterAltIcon from "@mui/icons-material/FilterAlt";

const Home = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
  const CURRENCY = import.meta.env.VITE_WOO_API_CURRENCY;

  const navigate = useNavigate();

  const [opendModal, setOpendModal] = useState(false);

  const { products, setProducts } = useContext(ProductContext);
  const { currentPage, setCurrentPage } = useContext(ProductContext);
  const { totalPages, setTotalPages } = useContext(ProductContext);
  const { currency, setCurrency } = useContext(ProductContext);
  const { category, setCategory } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [continueFetch, setContinueFetch] = useState(false);
  const [filteredProducts, setFilteredProducts] = useState(products);
  const [selectedFilters, setSelectedFilters] = useState({});
  const [selectedSlide, setSelectedSlide] = useState(0);

  const isDesktop = useMediaQuery("(min-width:1024px)");
  const isMobile = useMediaQuery("(max-width:630px)");

  useEffect(() => {
    const fetchCurrency = async () => {
      try {
        const response = await axios.get(`${CURRENCY}`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
          },
        });
        const currencyData = response.data;
        setCurrency(currencyData.SYP.rate);
        localStorage.setItem("currency", JSON.stringify(currencyData.SYP.rate));
        console.log("this is curency" + currencyData.SYP.rate);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrency();
  }, []);

  useEffect(() => {
    const fetchCategories = async () => {
      try {
        const response = await axios.get(`${WOO_URL}/products/categories`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            per_page: 100,
          },
        });

        const allCat = { name: "All", id: "all" };

        const updateCat = [allCat, ...response.data];

        setCategory(updateCat);
        localStorage.setItem("categories", JSON.stringify(updateCat));
        console.log("this is category" + response.data);
      } catch (e) {}
    };
    fetchCategories();
  }, []);

  const fetchProduct = async (page = 1) => {
    if (page === 1) {
      setLoading(true);
    }
    try {
      const response = await axios.get(`${WOO_URL}/products`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          status: "publish",
          per_page: 50,
          page,
        },
      });

      const products1 = response.data;

      /*if (!totalPages) {
        setTotalPages(parseInt(response.headers["x-wp-totalpages"]));
      }*/
      const totalPagesFromHeader = parseInt(
        response.headers["x-wp-totalpages"]
      );
      setTotalPages(totalPagesFromHeader);

      if (page === 1) {
        setProducts(products1);
      } else {
        setProducts((prevProducts) => {
          return [...prevProducts, ...products1];
        });
      }
      setContinueFetch(true);

      localStorage.setItem("products", JSON.stringify(response.data));

      console.log("this is product varioans" + products1);
    } catch (e) {
      console.log(e);
    } finally {
      setLoading(false);
    }
  };

  useEffect(() => {
    // Fetch page 1 first
    if (products.length === 0) {
      fetchProduct(1);
    }
    setContinueFetch(true);
  }, []);

  useEffect(() => {
    if (continueFetch && totalPages > 1) {
      // after to many tsst  the promble with fetch that it need to be synch and awaited
      const fetchRemainingPages = async () => {
        for (let page = 2; page <= totalPages; page++) {
          await fetchProduct(page);
        }
      };
      fetchRemainingPages();
    }
    setContinueFetch(false); // Stop fetching once all pages are fetched
  }, [totalPages]); // Runs when totalPages or continueFetch changes

  // here need some update or delets figure new way  write the way then ask gpt
  /*
  const handleNextPage = () => {
    if (currentPage < totalPages) {
      setCurrentPage(currentPage + 1);
    }
  };
  const handlBackPage = () => {
    if (currentPage > 1) {
      setCurrentPage(currentPage - 1);
    }
  };
*/
  useEffect(() => {
    // Filter products based on selectedFilters
    const filterProducts = () => {
      if (Object.keys(selectedFilters).length === 0) {
        setFilteredProducts(products);
        return;
      }

      const filtered = products.filter((product) => {
        return Object.entries(selectedFilters).some(
          ([attributeName, selectedOptions]) => {
            return product.attributes.some((attr) => {
              return (
                attr.name === attributeName &&
                attr.options.some((option) => selectedOptions.includes(option))
              );
            });
          }
        );
      });

      setFilteredProducts(filtered);
    };

    filterProducts();
  }, [selectedFilters, products]);

  const handleFilterChange = (selectedOptions) => {
    const filteredProducts = products.filter((product) => {
      // Check if the product matches all selected filters across attributes
      return Object.keys(selectedOptions).every((attributeName) => {
        if (!selectedOptions[attributeName].length) return true; // Skip if no options selected for this attribute

        const productAttribute = product.attributes.find(
          (attr) => attr.name === attributeName
        );

        // Ensure the product has the attribute and matches at least one of the selected options
        return (
          productAttribute &&
          selectedOptions[attributeName].some((option) =>
            productAttribute.options.includes(option)
          )
        );
      });
    });

    setFilteredProducts(filteredProducts);
    setSelectedFilters(selectedOptions); // Update state with the current selected filters
  };

  /**const handleFilterChange = (attributeName, option) => {
  setSelectedFilters((prevFilters) => {
    const updatedFilters = { ...prevFilters };

    if (!updatedFilters[attributeName]) {
      updatedFilters[attributeName] = [];
    }

    if (updatedFilters[attributeName].includes(option)) {
      // Remove the option if it's already selected
      updatedFilters[attributeName] = updatedFilters[attributeName].filter(
        (opt) => opt !== option
      );

      // If the attribute has no options selected, remove it from the filters
      if (updatedFilters[attributeName].length === 0) {
        delete updatedFilters[attributeName];
      }
    } else {
      // Add the option if it's not selected
      updatedFilters[attributeName].push(option);
    }

    return updatedFilters;
  });
};new one */

  const handleSlideClick = (index, slide) => {
    setSelectedSlide(index);
    switch (index) {
      case 0:
        navigate("/about");
        console.log(index + "case 0");
        break;

      case 1:
        navigate("/cart");
        console.log(index + "case 1");

        break;
      default:
      // Handle default case return null;
    }
  };
  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div>
        <Carousel
          selectedItem={selectedSlide}
          onClickItem={handleSlideClick}
          showStatus={false}
          autoPlay={true}
          infiniteLoop={true}
          emulateTouch={true}
          className="car-slide"
        >
          <img src={car1} alt="doda" />
          <img src={car2} alt="doda" />
        </Carousel>
        {/* delet hero compnent <Hero /> */}
        <h2 style={{ textAlign: "center" }}>All Products</h2>
        <div className="product-container">
          <div style={{ flex: "1" }}>
            {isDesktop && (
              <FilterComponent onFilterChange={handleFilterChange} />
            )}
            {isMobile && (
              <>
                <div
                  style={{
                    display: "flex",
                    alignItems: "center",
                    border: "2px solid gray",
                    borderRadius: "15px",
                    width: "30%",
                    marginBottom: "40px",
                  }}
                  onClick={() => {
                    setOpendModal(true);
                  }}
                >
                  <FilterAltIcon /> Filter
                </div>
                <FilterPopup
                  opened={opendModal}
                  closed={() => {
                    setOpendModal(false);
                  }}
                  onFilterChangeofPops={handleFilterChange}
                />
              </>
            )}
          </div>
          <div style={{ flex: "6", justifyItems: "center" }}>
            {loading ? (
              <div
                style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr " }}
              >
                {[...Array(9)].map((_, index) => (
                  <div key={index}>
                    <Skeleton height={200} />
                    <Skeleton width={150} />
                    <Skeleton width={100} />
                  </div>
                ))}
              </div>
            ) : (
              <div className="grid-container">
                {filteredProducts?.map((product) => {
                  return (
                    <Item2
                      key={product.id}
                      id={product.id}
                      name={product.name}
                      image={product.images[0]?.src}
                      price={product.price}
                      product={product}
                      saleprice={product.price}
                      regularprice={product.meta_data
                        .filter((data) => data.key === "custom_price")
                        .map((data, index) => {
                          return (
                            <div key={index}>
                              {(data.value * currency).toLocaleString()}
                            </div>
                          );
                        })}
                      onsale={product.on_sale ? <div>SALE</div> : null}
                    />
                  );
                })}
              </div>
            )}
          </div>
        </div>
        {/* delete pages <div>
          <button onClick={handlBackPage}>PREV PAGE</button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage}>NEXT PAGE</button>
        </div> */}
      </div>
    </SkeletonTheme>
  );
};
export default Home;
