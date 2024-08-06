import { useContext, useEffect } from "react";
import Hero from "../Components/Hero/Hero";
import axios from "axios";
import { useState } from "react";
import Item from "../Components/Item/Item";
import { ProductContext } from "../Context/ShopContext";

const Home = () => {
  const WOO_URL = import.meta.env.VITE_WOO_API_URL;
  const CONSUMER_KEY = import.meta.env.VITE_CONSUMER_KEY;
  const CONSUMER_SECRET = import.meta.env.VITE_CONSUMER_SECRET;

  const { products, setProducts } = useContext(ProductContext);

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
  }, []);
  const handlecClick = () => {};
  return (
    <div>
      <Hero />
      <h1>What Now</h1>
      <div style={{ display: "grid", gridTemplateColumns: "1fr 1fr 1fr " }}>
        {products.map((product) => {
          return (
            <Item
              key={product.id}
              id={product.id}
              name={product.name}
              image={product.images[0].src}
              price={product.price}
              click={handlecClick}
            />
          );
        })}
      </div>

      <h1>What Next</h1>
    </div>
  );
};
export default Home;
