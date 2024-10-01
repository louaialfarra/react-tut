import { useContext, useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import axios from "axios";
import { useState } from "react";
import Item from "../Components/Item/Item";
import { ProductContext } from "../Context/ShopContext";
import Skeleton, { SkeletonTheme } from "react-loading-skeleton";
import "react-loading-skeleton/dist/skeleton.css";
import Item2 from "../Components/Item/Item2";

import "../CSS/Home.css";
const Home = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
  const CURRENCY = import.meta.env.VITE_WOO_API_CURRENCY;

  const { products, setProducts } = useContext(ProductContext);
  const { currentPage, setCurrentPage } = useContext(ProductContext);
  const { totalPages, setTotalPages } = useContext(ProductContext);
  const { currency, setCurrency } = useContext(ProductContext);
  const { category, setCategory } = useContext(ProductContext);
  const [loading, setLoading] = useState(false);
  const [continueFetch, setContinueFetch] = useState(false);

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

        setCategory(response.data);
        localStorage.setItem("categories", JSON.stringify(response.data));
        console.log(response.data);
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
  }, []);

  useEffect(() => {
    // Fetch remaining pages
    if (continueFetch && totalPages > 1) {
      if (totalPages > 1) {
        for (let page = 2; page <= totalPages; page++) {
          fetchProduct(page); // Fetch remaining pages sequentially
        }
        setContinueFetch(false);
      }
    }
  }, [totalPages]);

  // here need some update or delets figure new way  write the way then ask gpt

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

  return (
    <SkeletonTheme baseColor="#202020" highlightColor="#444">
      <div>
        <Hero />
        <h1> NEW PRODUCTS</h1>
        {loading ? (
          <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr " }}>
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
            {products?.map((product) => {
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
                      return <div key={index}>{data.value * currency}</div>;
                    })}
                  onsale={product.on_sale ? <div>SALE</div> : null}
                />
              );
            })}
          </div>
        )}

        <h1>What Next</h1>
        <div>
          <button onClick={handlBackPage}>PREV PAGE</button>
          <span>
            {currentPage} of {totalPages}
          </span>
          <button onClick={handleNextPage}>NEXT PAGE</button>
        </div>
      </div>
    </SkeletonTheme>
  );
};
export default Home;
