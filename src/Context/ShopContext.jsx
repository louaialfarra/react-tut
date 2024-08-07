import { useState } from "react";
import { createContext } from "react";

export const ProductContext = createContext();

const ShopContextProvider = (props) => {
  const [products, setProducts] = useState([]);

  const [cart, setCart] = useState([]);

  const addToCart = (product) => {
    setCart((c) => [...c, product]);
  };

  return (
    <ProductContext.Provider value={{ products, setProducts, cart, addToCart }}>
      {props.children}
    </ProductContext.Provider>
  );
};

export default ShopContextProvider;
