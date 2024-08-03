import { useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import axios from "axios";
import { useState } from "react";

const Home = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

  const [products, setProducts] = useState([]);

  useEffect(() => {
    const fetchProduct = async () => {
      try {
        const response = await axios.get(`${WOO_URL}/products`, {
          params: {
            consumer_key: CONSUMER_KEY,
            consumer_secret: CONSUMER_SECRET,
          },
        });
        setProducts(response.data);
      } catch {}
    };

    fetchProduct();
    console.log(products);
  }, {});

  return (
    <div>
      <Hero />
      <h1>wwhat now</h1>
      {products.map((product) => {
        return (
          <h4>
            {product.name} PRICE : {product.price} and
            {product.sale_price}
          </h4>
        );
      })}
      <h1>wwhat Next</h1>
    </div>
  );
};
export default Home;
