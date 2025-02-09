import { Flag } from "@mui/icons-material";
import axios from "axios";
import { useEffect, useState, useRef } from "react";

const Test = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;
  const CURRENCY = import.meta.env.VITE_WOO_API_CURRENCY;

  const [products, setProducts] = useState([]);
  const [totalPages, setTotalPages] = useState();
  const [currentPage, setCurrentPage] = useState(1);
  const [isLoading, setIsLoading] = useState(false);
  // the main problem is in the x wp header i should set it from the beginging because it is changiner depending on the  per_page
  //asloo u should ad somthing to stop it i go sleep now
  const fetchPage1 = async () => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${WOO_URL}/products`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          per_page: 50,
        },
      });

      if (response.headers["x-wp-totalpages"]) {
        setTotalPages(parseInt(response.headers["x-wp-totalpages"], 10));
      }
      setProducts(response.data);
    } catch (e) {}
  };

  useEffect(() => {
    if (products.length === 0) {
      fetchPage1();
    }
  }, []);

  console.log(totalPages + "this is total pages");

  const fetchProducts = async (page) => {
    try {
      setIsLoading(true);

      const response = await axios.get(`${WOO_URL}/products`, {
        params: {
          consumer_key: CONSUMER_KEY,
          consumer_secret: CONSUMER_SECRET,
          page,
          per_page: 50,
        },
      });
      console.log(response.data + " Products");

      response.data.map((product) => console.log(product.name));

      setProducts((prevProducts) => [...prevProducts, ...response.data]);
    } catch (e) {
      console.log(e + "this is erroor");
    } finally {
      setIsLoading(false);
    }
  };

  console.log(currentPage + "CURRENT ");

  //const effectRan = useRef(false);
  /**useEffect(() => {
    if (products.length === 0) {
      fetchProducts(1);
    }
  }, []); */

  /**useEffect(() => {
    if (effectRan.current === false) {
      fetchProducts(currentPage);

      return () => {
        effectRan.current = true; // Set the effect as run
      };
    }
  }, [currentPage]); // Dependency array to run only once */

  useEffect(() => {
    const fetchRemainingPages = async () => {
      for (let page = 2; page <= totalPages; page++) {
        await fetchProducts(page);
        console.log(page + " this is page");
      }
    };
    fetchRemainingPages();
  }, []);

  return (
    <div>
      <h1>TEST</h1>

      {products.map((product) => (
        <div key={product.id}>{product.name}</div>
      ))}

      {isLoading && <p>Loading......</p>}
    </div>
  );
};

export default Test;
