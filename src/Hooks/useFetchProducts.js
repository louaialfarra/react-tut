import axios from "axios";
import { useEffect } from "react";

const useFetchProducts = (
  WOO_URL,
  CONSUMER_KEY,
  CONSUMER_SECRET,
  setProducts,
  setTotalPages,
  totalpages,
  setLoading,
  setLoading2,
  products,
  setContinueFetch,
  continueFetch
) => {
  useEffect(() => {
    const initialFetchProducts = async () => {
      setLoading(true);
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
      } finally {
        setLoading(false);
        setContinueFetch(true);
      }
    };
    if (products.length === 0) {
      initialFetchProducts();
    }
    setContinueFetch(true);
  }, []);

  useEffect(() => {
    const fetchProducts = async (page) => {
      setLoading2(true);
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
      } catch (e) {
      } finally {
        setLoading2(false);
      }
    };

    const fetchRemainingPages = async () => {
      for (let page = 2; page <= totalpages; page++) {
        await fetchProducts(page);
        console.log(page + " this is page");
      }
    };
    if (continueFetch && totalpages > 1) {
      fetchRemainingPages();
    }
    setContinueFetch(false);
  }, [totalpages]);
};

export default useFetchProducts;
