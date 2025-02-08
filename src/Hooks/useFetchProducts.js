import axios from "axios";
import { useContext, useEffect } from "react";
import { ProductContext } from "../Context/ShopContext";

const useFetchProducts = (
  WOO_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  setProducts,
  setTotalPages,
  totalpages
) => {
  useEffect(() => {
    const initialFetchProducts = async () => {
      try {
        const response = await axios.get(`${WOO_URL}/products`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
            status: "publish",
            per_page: 50,
          },
        });

        setTotalPages(parseInt(response.headers["x-wp-totalpages"]));
        setProducts(response.data);
      } catch (e) {
        console.log(e);
      }
    };
    initialFetchProducts();
  }, []);

  useEffect(() => {
    const fetchProducts = async (page) => {
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
        setProducts((prevProducts) => [...prevProducts, ...response.data]);
      } catch (e) {}
    };

    const fetchRemainingPages = async () => {
      for (let page = 2; page <= totalpages; page++) {
        await fetchProducts(page);
        console.log(page + " this is page");
      }
    };
    fetchRemainingPages();
  }, [totalpages]);
};

export default useFetchProducts;
