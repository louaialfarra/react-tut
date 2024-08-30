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
  const [loading, setLoading] = useState(false);

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
        console.log("this is curency" + currencyData.SYP.rate);
      } catch (e) {
        console.error(e);
      }
    };
    fetchCurrency();
  }, []);

  useEffect(() => {
    const fetchProduct = async () => {
      if (products[currentPage]) {
        // If products for the current page are already cached, no need to fetch
        return;
      }
      setLoading(true);
      try {
        const response = await axios.get(`${WOO_URL}/products`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            status: "publish",
            per_page: 100,
            page: currentPage,
          },
        });

        const products1 = response.data;

        setProducts((p) => ({ ...p, [currentPage]: products1 }));

        setTotalPages(parseInt(response.headers["x-wp-totalpages"]));

        console.log("this is product varioans" + products1);
      } catch (e) {
        console.log(e);
      } finally {
        setLoading(false);
      }
    };

    fetchProduct();
    console.log(products);
  }, [currentPage]);

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
            {products[currentPage]?.map((product) => {
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
